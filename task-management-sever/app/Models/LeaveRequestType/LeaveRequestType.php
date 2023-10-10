<?php

namespace App\Models\LeaveRequestType;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveRequestType extends Model
{
    use HasFactory, Fillable, SoftDeletes, LeaveRequestTypeAttribute, LeaveRequestTypeRelationship, LeaveRequestTypeScope;

    protected $fillable = [
        'title',
    ];
}
