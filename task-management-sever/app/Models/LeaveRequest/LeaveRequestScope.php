<?php

namespace App\Models\LeaveRequest;

use App\Enums\LeaveRequestStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait LeaveRequestScope
{
    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('user_id', $id);
    }

    public function scopePendingStatus(Builder $query): void
    {
        $query->where('status', 0);
    }

    public function scopeNotPendingStatus(Builder $query): void
    {
        $query->where('status', '<>', 0);
    }

    public function scopeNotAccepted(Builder $query): void
    {
        $query->where('accept_by', null);
    }

    public function scopeAccepted(Builder $query): void
    {
        $query->where('accept_by', '<>', null);
    }
}
