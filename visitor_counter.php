<?php
// Path to the counter file
$counterFile = 'visitor_count.txt';

// Read the current count
$count = file_exists($counterFile) ? (int)file_get_contents($counterFile) : 0;

// Increment the count
$count++;

// Save the new count
file_put_contents($counterFile, $count);

// Format the number (add K, M, etc.)
function formatNumber($number) {
    if ($number >= 1000000) {
        return round($number / 1000000, 1) . 'M';
    } elseif ($number >= 1000) {
        return round($number / 1000, 1) . 'K';
    }
    return $number;
}

// Return the formatted count
echo formatNumber($count);
?>
