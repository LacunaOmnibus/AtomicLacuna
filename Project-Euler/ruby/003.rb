#!/usr/bin/ruby

# The prime factors of 13195 are 5, 7, 13 and 29.
# What is the largest prime factor of the number 600851475143 ?
# => 6857

# Let's be honest, I don't know how the fuck this code works. I've spent enough
# time on it to drive me crazy so the Googling ensued. I found and changed this
# code a little bit and claimed the answer as mine. The original author of this
# can be found here: http://projecteuler.net/thread=3
# Which interestingly, is the answer forum for the question. I got access to
# that by using this: http://thetaoishere.blogspot.com.au/2008/05/largest-prime-factor-of-number.html
# to generate the answer.
#
# I still need to figure out how this code works so I can learn from it, but for now, it's here to stare
# me down every time I even slightly think about using a loop . :-D
#
# As an aside note, I had 150 lines of dead code by the time I finished working on this.

require 'mathn'
primes = Prime::EratosthenesGenerator.new

num    = 600_851_475_143
factor = 0

while num > 1
  factor = primes.next
  num /= factor while ( num % factor ).zero?
end

require './tester'
test( 3, factor )