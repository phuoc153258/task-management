<?php

namespace App\Models\TaskReport;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskReport extends Model
{
    use HasFactory, Fillable, SoftDeletes, TaskReportAttribute, TaskReportRelationship, TaskReportScope;

    protected $fillable = [
        'task_id',
        'title',
        'description',
        'status',
    ];

    protected $appends = ['status_name'];
}
