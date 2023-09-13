<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'content',
        'start_date',
        'end_date',
        'status',
        'accept_by',
        'user_id',
        'leave_request_type_id',
    ];
}
