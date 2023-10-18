<?php

namespace App\Repositories\Notification;

use App\Repositories\Notification\NotificationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function getList()
    {
        $user = auth()->user();
        return DB::table('notifications')
            ->where('data->user->id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function readNotification($id)
    {
        $user = auth()->user();
        return DB::table('notifications')
            ->where('data->user->id', $user->id)
            ->where('id', $id)
            ->update(['read_at' => now()]);
    }
}
