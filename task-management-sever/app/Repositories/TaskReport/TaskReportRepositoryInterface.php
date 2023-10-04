<?php

namespace App\Repositories\TaskReport;

interface TaskReportRepositoryInterface
{
    public function list($options, $user_id);

    public function show($id, $user_id);

    public function create($taskReportDetails, $user_id);
}
