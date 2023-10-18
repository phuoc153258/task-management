<?php

namespace App\Models\LeaveRequest;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class LeaveRequest extends Model
{
    use HasFactory, Fillable, SoftDeletes, LeaveRequestScope, LeaveRequestAttribute, LeaveRequestRelationship, Notifiable;

    protected $fillable = [
        'content',
        'leave_registration_date',
        'status',
        'accept_by',
        'user_id',
        'leave_request_type_id',
    ];

    protected $appends = ['status_name'];
}
