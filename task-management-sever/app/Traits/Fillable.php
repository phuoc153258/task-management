<?php

namespace App\Traits;

trait Fillable
{
    public static function getFields()
    {
        return (new static)->getFillable();
    }
}
