<?php

namespace App\Services\TaskReport;

use App\Repositories\TaskReport\TaskReportRepository;
use App\Services\Task\TaskService;

class TaskReportService implements TaskReportServiceInterface
{
    public function __construct(private TaskReportRepository $taskReportRepository, private TaskService $taskService)
    {
    }

    public function index($options, $user_id)
    {
        return $this->taskReportRepository->list($options, $user_id);
    }

    public function show($id, $user_id)
    {
        return $this->taskReportRepository->show($id, $user_id);
    }

    public function create($taskReportDetails, $user_id)
    {
        $this->taskService->show($taskReportDetails['task_id'], $user_id);

        return $this->taskReportRepository->create($taskReportDetails, $user_id);
    }

    public function update($taskReportDetails, $id, $user_id)
    {
        $taskReport = $this->taskReportRepository->show($id, $user_id);
        $taskReport->update($taskReportDetails);

        return $taskReport;
    }

    public function delete($id, $user_id)
    {
        $taskReport = $this->taskReportRepository->show($id, $user_id);
        $taskReport->delete();

        return $taskReport;
    }
}
