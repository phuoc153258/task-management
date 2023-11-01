<?php

namespace App\Models\UserProject;

use App\Traits\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProject extends Model
{
    use HasFactory, Fillable, UserProjectAttribute, UserProjectRelationship, UserProjectScope;

    protected $fillable = [
        'user_id',
        'project_id',
    ];
}
