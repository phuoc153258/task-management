<?php

namespace App\Models\Project;

use App\Enums\ProjectStatus;

trait ProjectAttribute
{
    function getStatusNameAttribute()
    {
        return trans('message.status.project.' . strtolower(ProjectStatus::tryFrom($this->status)?->name))  ?? "";
    }
}
