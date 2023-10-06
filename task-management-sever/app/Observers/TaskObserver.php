<?php

namespace App\Observers;

use App\Models\Task;
use App\Repositories\Admin\TaskReport\TaskReportRepository;

class TaskObserver
{
    public function __construct(private TaskReportRepository $taskReportRepository)
    {
    }

    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {
        $this->taskReportRepository->deleteMany($task->id);
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        $this->taskReportRepository->restoreMany($task->id);
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        $this->taskReportRepository->forceMany($task->id);
    }
}
