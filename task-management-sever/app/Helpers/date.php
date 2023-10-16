<?php

use Carbon\Carbon;

if (!function_exists('formatDate')) {
    function formatDate($date, $format)
    {
        return Carbon::parse($date)->format($format);
    }
}
