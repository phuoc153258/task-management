<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Builder;

trait NotificationScope
{
    public function scopeOfUser(Builder $query, $id): void
    {
        $query->where('data->user->id', $id);
    }

    public function scopeOfNotification(Builder $query, $id): void
    {
        $query->where('id', $id);
    }
}
