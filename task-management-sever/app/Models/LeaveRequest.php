<?php

namespace App\Models;

use App\Enums\LeaveRequestStatus;
use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveRequest extends Model
{
    use HasFactory, Fillable, SoftDeletes;

    protected $fillable = [
        'content',
        'start_date',
        'end_date',
        'status',
        'accept_by',
        'user_id',
        'leave_request_type_id',
    ];

    protected $appends = ['status_name'];

    function getStatusNameAttribute()
    {
        return trans('message.status.leave-request.' . strtolower(LeaveRequestStatus::tryFrom($this->status)?->name))  ?? "";
    }

    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('user_id', $id);
    }

    public function scopePendingStatus(Builder $query): void
    {
        $query->where('status', 0)->where('accept_by', null);
    }

    public function scopeNotPendingStatus(Builder $query): void
    {
        $query->where('status', '<>', 0)->where('accept_by', '<>', null);
    }

    public function leaveRequestType(): BelongsTo
    {
        return $this->belongsTo(LeaveRequestType::class);
    }
}
