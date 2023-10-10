<?php

namespace App\Models\Project;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, Fillable, SoftDeletes, ProjectAttribute, ProjectRelationship, ProjectScope;

    protected $fillable = [
        'title',
        'description',
        'status',
        'created_by',
    ];

    protected $appends = ['status_name'];
}
