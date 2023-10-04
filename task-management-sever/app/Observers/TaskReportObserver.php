<?php

namespace App\Observers;

use App\Models\TaskReport;
use App\Repositories\Task\TaskRepository;

class TaskReportObserver
{
    public function __construct(private TaskRepository $taskRepository)
    {
    }

    /**
     * Handle the TaskReport "created" event.
     */
    public function created(TaskReport $taskReport): void
    {
        $this->taskRepository->update(['status' => $taskReport->status], $taskReport->task_id);
    }

    /**
     * Handle the TaskReport "updated" event.
     */
    public function updated(TaskReport $taskReport): void
    {
    }

    /**
     * Handle the TaskReport "deleted" event.
     */
    public function deleted(TaskReport $taskReport): void
    {
        //
    }

    /**
     * Handle the TaskReport "restored" event.
     */
    public function restored(TaskReport $taskReport): void
    {
        //
    }

    /**
     * Handle the TaskReport "force deleted" event.
     */
    public function forceDeleted(TaskReport $taskReport): void
    {
        //
    }
}
