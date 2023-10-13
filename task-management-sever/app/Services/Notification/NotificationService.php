<?php

namespace App\Services\Notification;

use App\Repositories\Notification\NotificationRepositoryInterface;

class NotificationService implements NotificationServiceInterface
{
    public function __construct(private NotificationRepositoryInterface $notificationRepository)
    {
    }

    public function getList()
    {
        return $this->notificationRepository->getList();
    }

    public function readNotification($id)
    {
        return $this->notificationRepository->readNotification($id);
    }
}
