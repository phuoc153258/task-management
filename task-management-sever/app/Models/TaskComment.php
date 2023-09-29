<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskComment extends Model
{
    use HasFactory, Fillable;

    protected $fillable = [
        'content',
        'user_id',
        'task_id',
    ];
}
