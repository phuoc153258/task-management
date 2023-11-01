<?php

namespace App\Models\User;

use App\Models\UserProject\UserProject;

trait UserRelationship
{
    public function userProjects()
    {
        return $this->hasMany(UserProject::class);
    }
}
