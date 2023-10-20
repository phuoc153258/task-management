<?php

namespace App\Repositories\Notification;

use App\Models\Notification\Notification;
use App\Repositories\Notification\NotificationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function getList()
    {
        $user = auth()->user();

        return Notification::ofUser($user->id)
            ->orderByDesc('created_at')
            ->get();
    }

    public function getNotification($id, $userId)
    {
        return Notification::ofUser($userId)->findOrFail($id);
    }

    public function readNotification($id)
    {
        $user = auth()->user();
        $notification = $this->getNotification($id, $user->id);

        $notification->markAsRead();

        return $notification;
    }
}
