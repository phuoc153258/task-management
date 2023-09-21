<?php

namespace App\Traits;

trait AuthorizationTrait
{
    protected function getCurrentUser()
    {
        return auth()->user();
    }
}
