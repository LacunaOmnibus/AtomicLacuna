// Let's do some hacking so we can treat this entire thing like a class.
(function($) {

    // Setup a Date object at the start of the program. Assign to this so it
    // doesn't need to be passed all through creation to be used.
    this.programStart = new Date();

    // I forget these numbers so often it's not funny.
    // Put them up top so they get defined before everything gets kicked off.
    var monthDays = [
        31, // January
        isLeapYear() ? 29 : 28, // February - including leap year.
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31  // December
    ];

    // Do _this so we can access it from different functions.
    var ticker;


    $("#startButton").click(function() {
        // Reset the time that start is calculated from to get a fresh value.
        window.programStart = new Date();
        var length = calculateDifference();
        ticker = new Ticker(length);
        ticker.start();
    });

    $("#stopButton").click(function() {
        if (ticker) {
            ticker.stop();
        }
    });

    function calculateDifference() {
        var userValues = getUserValues(),
            nowValues = getNowValues(),
            start = arrayToSeconds(nowValues),
            end = arrayToSeconds(userValues),
            length = end - start
        ;

        return length;
    }
 
    function getUserValues() {
        return [
            sanitize($("#countToSecond").val()),
            sanitize($("#countToMinute").val()),
            sanitize($("#countToHour").val()),
            sanitize($("#countToDay").val()),
            sanitize($("#countToMonth").val()),
            sanitize($("#countToYear").val())
        ];
    }

    function getNowValues() {
        // For the moment, we can assume that JS makes sure these values are sane
        // before they get sent to us.
        return [
            window.programStart.getSeconds(),
            window.programStart.getMinutes(),
            window.programStart.getHours(),
            window.programStart.getDate(),
            window.programStart.getMonth() + 1,
            window.programStart.getFullYear()
        ];
    }

    // I like having _this in a 'class' it makes all the boolean values feel like
    // they have somewhere proper to live rather than just the global namespace.
    function Ticker(countLength) {
        var _this = this;

        if (countLength) {
            _this.count = countLength;
            _this.canRun = true;
        }
        else {
            _this.canRun = false;
        }

        _this.start = function() {
            if (_this.canRun) {
                _this.running = true;
                $("#tickerName").html("... " + $("#tickerNameInput").val());
                // Tick straight away to give an instant reaction to the start
                // button.
                _this.tick();
                // Then schedule it.
                _this.tickerTimeoutRef = setInterval(_this.tick, 1000);
            }
            else {
                throw new Error("You got somethin' wrong, boy!");
            }
        };

        _this.stop = function() {
            _this.running = false;
            clearInterval(_this.tickerTimeoutRef);
            _this.finish();
        };

        _this.finish = function() {
            alert("We made it!");
        }

        _this.tick = function() {
            if (!_this.running) {
                _this.stop();
            }

            var formatted = formatTime(_this.count);

            if (_this.count === 0 || formatted === "") {
                _this.stop();
            }
            else {
                $("#tickerStatus").html(formatted);
                _this.count--;
            }

        };
    }

    function arrayToSeconds(values) {
        var total = values[0];

        // Minutes to seconds.
        total += values[1] * 60;

        // Hours to seconds.
        total += values[2] * 60 * 60;

        // Days to seconds.
        total += values[3] * 24 * 60 * 60;

        // Months to seconds.
        total += values[4] * monthDays[window.programStart.getMonth()] * 24 * 60 * 60;

        // Years to seconds.
        total += values[5] * getYearDays() * 24 * 60 * 60;

        return total;
    }

    function getYearDays() {
        return isLeapYear() ? 366 : 365;
    }

    function isLeapYear() {
        var year = window.programStart.getFullYear();
        return (year % 400 === 0 || year % 4 === 0);
    }

    // String goes in, sane number goes out.
    function sanitize(string) {
        var number = parseInt(string, 10);

        // If an empty string is supplied, parseInt turns it into a NaN.
        number = isNaN(number) ? 0 : number;

        // TODO: are there any more checks we should make in future?

        return number;
    }

    function formatTime(input) {
        if (input <= 0) {
            return '';
        }

        var secondsInYear = 365 * 24 * 60 * 60,
            secondsInDay = 60 * 60 * 24,
            secondsInHour = 60 * 60,
            secondsInMin = 60,

            year = Math.floor(input / secondsInYear),
            dleft = input % secondsInYear,
            
            day = Math.floor(dleft / secondsInDay),
            hleft = input % secondsInDay,
            
            hour = Math.floor(hleft / secondsInHour),
            sleft = hleft % secondsInHour,
            min = Math.floor(sleft / 60),
            
            seconds = Math.floor(sleft % 60)
        ;

        if (year > 0) {
            return [year, lengthen(day), lengthen(hour), lengthen(min), lengthen(seconds)].join(' : ');
        }
        else if (day > 0) {
            return [lengthen(day), lengthen(hour), lengthen(min), lengthen(seconds)].join(' : ');
        }
        else if (hour > 0) {
            return [lengthen(hour), lengthen(min), lengthen(seconds)].join(' : ');
        }
        else {
            return [lengthen(min), lengthen(seconds)].join(' : ');
        }
    }

    // Lengthens a number like "1" to "01". Used in keeping the timer display nice
    // looking.
    function lengthen(number) {
        number = number.toString();
            
        if (number.length === 1) {
            return "0" + number;
        }
        else {
            return number;
        }
    }
}).call({}, jQuery);
