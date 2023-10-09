<?php

namespace App\Observers;

use App\Models\TaskReport;
use App\Repositories\Task\TaskRepository;
use App\Repositories\TaskReport\TaskReportRepositoryInterface;

class TaskReportObserver
{
    public function __construct(private TaskRepository $taskRepository, private TaskReportRepositoryInterface $taskReportRepository)
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
        $this->taskRepository->update(['status' => $taskReport->status], $taskReport->task_id);
    }

    /**
     * Handle the TaskReport "deleted" event.
     */
    public function deleted(TaskReport $taskReport): void
    {
        $taskReportLasted = $this->taskReportRepository->getLasted($taskReport->task_id);
        $this->taskRepository->update(['status' => $taskReportLasted->status], $taskReportLasted->task_id);
    }

    /**
     * Handle the TaskReport "restored" event.
     */
    public function restored(TaskReport $taskReport): void
    {
        $taskReportLasted = $this->taskReportRepository->getLasted($taskReport->task_id);
        $this->taskRepository->update(['status' => $taskReportLasted->status], $taskReportLasted->task_id);
    }

    /**
     * Handle the TaskReport "force deleted" event.
     */
    public function forceDeleted(TaskReport $taskReport): void
    {
        //
    }
}
