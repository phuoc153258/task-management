<?php

namespace App\Models\LeaveRequest;

use App\Enums\LeaveRequestStatus;

trait LeaveRequestAttribute
{
    function getStatusNameAttribute()
    {
        return trans('message.status.leave-request.' . strtolower(LeaveRequestStatus::tryFrom($this->status)?->name))  ?? "";
    }
}
