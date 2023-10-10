<?php

namespace App\Observers;

use App\Models\UserProject\UserProject;
use App\Repositories\Admin\Task\TaskRepository;

class UserProjectObserver
{
    private TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }
    /**
     * Handle the UserProject "created" event.
     */
    public function created(UserProject $userProject): void
    {
        //
    }

    /**
     * Handle the UserProject "updated" event.
     */
    public function updated(UserProject $userProject): void
    {
        //
    }

    /**
     * Handle the UserProject "deleted" event.
     */
    public function deleted(UserProject $userProject): void
    {
        $this->taskRepository->deleteMany($userProject->user_id, $userProject->project_id);
    }

    /**
     * Handle the UserProject "restored" event.
     */
    public function restored(UserProject $userProject): void
    {
        $this->taskRepository->restoreMany($userProject->user_id, $userProject->project_id);
    }

    /**
     * Handle the UserProject "force deleted" event.
     */
    public function forceDeleted(UserProject $userProject): void
    {
        $this->taskRepository->forceMany($userProject->user_id, $userProject->project_id);
    }
}
