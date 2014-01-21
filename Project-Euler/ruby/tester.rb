#!/usr/bin/ruby

# Note: these are defined as strings rather than numbers, so we need to be
# careful insde the verify function.
$answers = %w[
	233168
	4613732
	6857
	906609
	232792560
]

def verify( number, result )
	return $answers[ number - 1 ] == result.to_s
end

def test( number, result )
	if verify( number, result )
		puts "Problem #{ number }: #{ result }"
	else
		puts "Problem #{ number } is incorrect with a value of #{ result }! It should be #{ $answers[ number - 1 ] }!"
		exit
	end
end