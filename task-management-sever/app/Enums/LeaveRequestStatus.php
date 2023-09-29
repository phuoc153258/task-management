<?php

namespace App\Enums;

enum LeaveRequestStatus: int
{
    case Pending = 0;
    case Accept = 1;
    case Reject = 2;
}
