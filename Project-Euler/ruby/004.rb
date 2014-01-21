#!/usr/bin/ruby

# A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
# Find the largest palindrome made from the product of two 3-digit numbers.
# => 906609

def is_number_pallindrome( num )
	return num.to_s == num.to_s.reverse
end

ans = 0
100.upto( 999 ) do | i1 |
	i1.upto( 999 ) do | i2 |
		if is_number_pallindrome( i1 * i2)
			ans = [ ans, i1 * i2 ].max
		end
	end
end

require './tester'
test( 4, ans )