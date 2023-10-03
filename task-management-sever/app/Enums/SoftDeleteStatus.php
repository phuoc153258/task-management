<?php

namespace App\Enums;

enum SoftDeleteStatus: int
{
    case NotSoftDelete = 1;
    case OnlySoftDelete = 2;
    case Both = 3;
}
