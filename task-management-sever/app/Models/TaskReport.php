<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskReport extends Model
{
    use HasFactory, Fillable, SoftDeletes;

    protected $fillable = [
        'user_id',
        'task_id',
        'title',
        'description',
        'status',
    ];
}
