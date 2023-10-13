<?php

namespace App\Repositories\Notification;

interface NotificationRepositoryInterface
{
    public function getList();
    public function readNotification($id);
}
