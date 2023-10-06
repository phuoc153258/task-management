<?php

namespace App\Repositories\Admin\TaskReport;

interface TaskReportRepositoryInterface
{
    public function list($options, $task_id);

    public function getById(int $id);

    public function create($taskReportDetails);

    public function update($taskReportDetails, $id);

    public function delete($id);

    public function restore($id);

    public function force($id);

    public function deleteMany($task_id);
}
