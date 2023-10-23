<?php

namespace App\Models\Task;

use App\Models\Project\Project;
use App\Models\User\User;

trait TaskRelationship
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
