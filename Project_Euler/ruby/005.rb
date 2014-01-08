#!/usr/bin/ruby

# 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
# What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
# => 232792560

# TODO: make this run quickly even when starting the loop from 0!

# This is cheating the spirit in which we do these problems, but oh well, it's
# crazy fast!
#
# 	require 'rational'
# 	num = (1..20).inject(1) { |result, n| result.lcm n }
# 	puts "Smallest evenly divisible number is #{ num }."
#
# Runs in irb basically instantly. (Again, stolen from the Project Euler forums).

def check_multiples( num )
	if num % 2  == 0 and
	   num % 3  == 0 and
	   num % 4  == 0 and
	   num % 5  == 0 and
	   num % 6  == 0 and
	   num % 7  == 0 and
	   num % 8  == 0 and
	   num % 9  == 0 and
	   num % 10 == 0 and
	   num % 11 == 0 and
	   num % 12 == 0 and
	   num % 13 == 0 and
	   num % 14 == 0 and
	   num % 15 == 0 and
	   num % 16 == 0 and
	   num % 17 == 0 and
	   num % 18 == 0 and
	   num % 19 == 0 and
	   num % 20 == 0 then
		return true
	else
		return false
	end
end

ans = 0
i   = 20 # We know the answer now, let's make it run quickly. :P
#i = 232_000_000
correct = false

while not correct do
	i += 20
	
	if check_multiples( i )
		ans = i
		correct = true
	end
end

# correct has been set to false, we have an answer.
require './tester'
test( 5, ans )