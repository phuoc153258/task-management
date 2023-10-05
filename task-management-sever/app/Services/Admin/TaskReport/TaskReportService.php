<?php

namespace App\Services\Admin\TaskReport;

use App\Repositories\Admin\TaskReport\TaskReportRepositoryInterface;

class TaskReportService implements TaskReportServiceInterface
{
    public function __construct(private TaskReportRepositoryInterface $taskRepository)
    {
    }

    public function index($options, $task_id)
    {
        return $this->taskRepository->list($options, $task_id);
    }

    public function show($id)
    {
        return $this->taskRepository->getById($id);
    }

    public function create($taskReportDetails)
    {
        return $this->taskRepository->create($taskReportDetails);
    }

    public function update($taskReportDetails, $id)
    {
        return $this->taskRepository->update($taskReportDetails, $id);
    }

    public function delete($id)
    {
        return $this->taskRepository->delete($id);
    }

    public function restore($id)
    {
        return $this->taskRepository->restore($id);
    }

    public function force($id)
    {
        return $this->taskRepository->force($id);
    }
}
