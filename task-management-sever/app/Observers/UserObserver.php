<?php

namespace App\Observers;

use App\Models\User;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepository;
use App\Repositories\Admin\Task\TaskRepository;
use App\Repositories\Admin\UserProject\UserProjectRepository;

class UserObserver
{
    private LeaveRequestRepository $leaveRequestRepository;
    private UserProjectRepository $userProjectRepository;
    private TaskRepository $taskRepository;

    public function __construct(LeaveRequestRepository $leaveRequestRepository, UserProjectRepository $userProjectRepository, TaskRepository $taskRepository)
    {
        $this->leaveRequestRepository = $leaveRequestRepository;
        $this->userProjectRepository = $userProjectRepository;
        $this->taskRepository = $taskRepository;
    }

    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $user->assignRole([2]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        $this->leaveRequestRepository->deleteMany($user->id);
        $this->userProjectRepository->deleteMany($user->id);
        $this->taskRepository->deleteMany($user->id);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}