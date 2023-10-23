<?php

namespace App\Models\Project;

use App\Models\User\User;
use App\Models\UserProject\UserProject;

trait ProjectRelationship
{
    public function user()
    {
        return $this->belongsTo(User::class,  'created_by', 'id');
    }

    public function userProjects()
    {
        return $this->hasMany(UserProject::class);
    }
}
