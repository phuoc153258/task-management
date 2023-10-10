<?php

namespace App\Models\LeaveRequest;

use App\Models\LeaveRequestType\LeaveRequestType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait LeaveRequestRelationship
{
    public function leaveRequestType(): BelongsTo
    {
        return $this->belongsTo(LeaveRequestType::class);
    }
}
