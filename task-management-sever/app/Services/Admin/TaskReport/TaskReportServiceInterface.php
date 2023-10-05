<?php

namespace App\Services\Admin\TaskReport;

interface TaskReportServiceInterface
{
    public function index($options, $task_id);

    public function show($id);

    public function create($taskReportDetails);

    public function update($taskReportDetails, $id);

    public function delete($id);
}
