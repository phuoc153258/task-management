<?php

namespace App\Enums;

enum TaskStatus: int
{
    case Pending = 0;
    case Testing = 1;
    case Done = 2;
}
