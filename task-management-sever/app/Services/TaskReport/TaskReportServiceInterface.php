<?php

namespace App\Services\TaskReport;

interface TaskReportServiceInterface
{
    public function index($options, $user_id);

    public function show($id, $user_id);

    public function create($taskReportDetails, $user_id);

    public function update($taskReportDetails, $id, $user_id);
}
