<?php

namespace App\Traits;

trait Authorizable
{
    protected function getCurrentUser()
    {
        return auth()->user();
    }
}
