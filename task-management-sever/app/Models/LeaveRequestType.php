<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveRequestType extends Model
{
    use HasFactory, Fillable, SoftDeletes;

    protected $fillable = [
        'title',
    ];
}
