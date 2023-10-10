<?php

namespace App\Models\UserProject;

use App\Models\Project\Project;
use App\Models\User\User;

trait UserProjectRelationship
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
}
