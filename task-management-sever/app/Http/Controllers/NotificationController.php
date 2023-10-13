<?php

namespace App\Http\Controllers;

use App\Services\Notification\NotificationService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class NotificationController extends Controller
{
    use Authorizable, HttpResponsable;

    public function __construct(private NotificationService $notificationService)
    {
    }

    public function index()
    {
        try {
            $notificationsResponse = $this->notificationService->getList();

            return $this->success($notificationsResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update($id)
    {
        try {
            $notificationsResponse = $this->notificationService->readNotification($id);

            return $this->success($notificationsResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
