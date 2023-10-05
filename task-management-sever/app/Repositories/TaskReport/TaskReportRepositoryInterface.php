<?php

namespace App\Repositories\TaskReport;

interface TaskReportRepositoryInterface
{
    public function list($options, $task_id, $user_id);

    public function show($id, $user_id);

    public function create($taskReportDetails, $user_id);

    public function getLasted($id);
}
