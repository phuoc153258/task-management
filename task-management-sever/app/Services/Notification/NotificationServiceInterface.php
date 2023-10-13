<?php

namespace App\Services\Notification;

interface NotificationServiceInterface
{
    public function getList();
    public function readNotification($id);
}
