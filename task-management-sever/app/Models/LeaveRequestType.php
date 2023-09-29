<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequestType extends Model
{
    use HasFactory, Fillable;

    protected $fillable = [
        'title',
    ];
}
