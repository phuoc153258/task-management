<?php

namespace App\Models;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskReport extends Model
{
    use HasFactory, Fillable;

    protected $fillable = [
        'user_id',
        'task_id',
        'title',
        'description',
        'status',
    ];
}
