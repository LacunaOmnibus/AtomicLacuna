#!/usr/bin/env perl

# I can't be fucked to figure out how to do this in Ruby. Maybe later.

use strict;
use warnings;
use v5.16;

$|++;

my @files = <???.rb>;
system "ruby $_" for (@files);
