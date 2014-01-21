function CountdownTimer() {
    var self = this;

    /**
     * Just the constructor, it does stuff. Don't look.
     *
     * @return {undefined} - nothing
     */
    self.init = function(options) {

        if (!self.checkValidMoment(options.countTo)) {
            throw new Error("Must provide a valid `moment` object.");
        }
        else {
            self.countTo = options.countTo;    
        }

        // Add the `#` at the front to simply uses of these variables in the 
        // jQuery constructor. If you need to do something different with the
        // element in the selector, don't worry, I won't help you.
        // Eg: $('#' + self.countDisplayEl) vs $(self.countDisplayEl)
        // TODO: check that these are defined before we use them! Important!
        self.tickEl = '#' + options.tickEl;
        self.descriptionEl = '#' + options.descriptionEl;
        self.description = options.tickerDescription;

        // Use these as *something* to put on the screen before the user hits
        // the wonderful lil' start button.
        self.defaultTickVal = "O-hai there!";
        self.defaultDescriptionVal = "Press the Start Button!";

        // Store these here so we don't have to keep getting new references to
        // them.
        self.$tickEl = $(self.tickEl);
        self.$descriptionEl = $(self.descriptionEl);

        self.animate = options.animate ? true : false;

        if (options.start) {
            self.startTicking();
        }
        else {
            self.reset();
        }
    };


    /**
     * Calculated the number of seconds that will be counted down.
     *
     * @return {undefined} - nothing
     */
    self.calculate = function() {
        self.now = self.getNow();
        self.tickerVal = self.countTo.diff(self.now, 'seconds');
    };


    /**
     * Determine if the given moment object is valid.
     * 
     * @param {moment} momentObject - a `moment` object to test
     * @return {boolean} - weather the momentObject is valid
     */
    self.checkValidMoment = function(momentObject) {
        return (moment.isMoment(momentObject) && momentObject.isValid());
    };


    /**
     * Format the given time.
     *
     * @param {integer} time - time in seconds to be formatted
     * @return {String} to be displayed to the user
     */
    self.format = function(time) {
        var duration = moment.duration(time, 'seconds'),
            array = [],
            units = ['years', 'days', 'hours', 'minutes', 'seconds']
        ;
        
        $.each(units, function(i, unit) {
            if (typeof duration[unit] === 'function') {
                var val = parseInt(duration[unit](), 10);
                val = self.twoDigitLength(val);
                array.push(val);
            }
        });

        return array.join(' : ');
    };


    /**
     * Gets the current time.
     *
     * @return {moment} - an instantiated moment object
     */
    self.getNow = function() {
        return moment(new Date());
    };


    /**
     * Renders the formatted time and the description onto the screen.
     *
     * @return {undefined} - nothing
     */
    self.render = function() {
        var formattedTime = self.format(self.tickerVal);

        if (self.animate) {
            $(self.tickEl).fadeOut(120, function() {

                self.$tickEl.html(formattedTime)

                // Element is now hidden. Show it again.
                $(this).fadeIn(120);
            });
        }
        else {
            self.$tickEl.html(formattedTime);
        }
        
    };


    /**
     * Resets a few things.
     *
     * @return {undefined} - nothing
     */
    self.reset = function() {
        self.$tickEl.html(self.defaultTickVal);
        self.$descriptionEl.html(self.defaultDescriptionVal);
    };


    /**
     * Sets the interval at which the tick() function is called. This method
     * can be wired in as a jQuery click event handler.
     *
     * @return {undefined} - nothing
     */
    self.startTicking = function(event) {
        // Make sure we're not ticking already.
        if (!self.ticking) {
            self.calculate();
            self.ticker = setInterval(self.tick, 1000);
            self.ticking = true;
            self.$descriptionEl.html(self.description);
        }
    };


    /**
     * Clears the interval at which the tick() function is called. This method
     * can be wired in as a jQuery click event handler.
     *
     * @returns {undefined} - nothing
     */
    self.stopTicking = function() {
        clearInterval(self.ticker);
        self.ticking = false;
        self.reset();
    };


    /**
     * Called every 1000 ms to subtract 1 from the ticker value and re-render
     * everything. Will only update if the ticking flag is true.
     *
     * @returns {undefined} - nothing
     */
    self.tick = function() {
        if (self.ticking) {
            self.tickerVal -= 1;
            self.render();
        }
        else {
            self.stopTicking();
        }
    };


    /**
    * Ensures that the given integer is two digits long.
    *
    * @param {integer} number - a number that needs to be two digits long
    * @return {integer} number - a number that is two digits long
    */
    self.twoDigitLength = function(number) {
        switch (number.toString().length) {
            case 0:
                return "00";
            case 1:
                return "0" + number.toString();
            default:
                return number;
        }
    };

}


var cdt = new CountdownTimer();

// Initialize all the things!!!
cdt.init({
    countTo: moment("03-02-2014 08-45-00", "DD-MM-YYYY HH-mm-ss"),
    tickEl: 'counterStatus',
    nameEl: 'counterName',
    descriptionEl: 'counterDescription',
    tickerDescription: 'Until the start of Year 9.',
    start: true,
    animate: false
});

// Some basic events, for the time being.
$('#startButton').click(cdt.startTicking);
$('#stopButton').click(cdt.stopTicking);
