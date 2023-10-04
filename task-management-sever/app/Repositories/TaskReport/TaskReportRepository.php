<?php

namespace App\Repositories\TaskReport;

use App\Models\TaskReport;
use App\Repositories\TaskReport\TaskReportRepositoryInterface;

class TaskReportRepository implements TaskReportRepositoryInterface
{
    public function list($options, $user_id)
    {
        $taskResponse = TaskReport::query()
            ->with(['task'])
            ->ofUser($user_id)
            ->when(isset($options['task_id']), function ($query) use ($options) {
                return $query->ofTask($options['task_id']);
            })
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.task.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $taskResponse;
    }

    public function show($id, $user_id)
    {
        return TaskReport::with('task')->ofUser($user_id)->findOrFail($id);
    }

    public function create($taskReportDetails, $user_id)
    {
        return TaskReport::with('task')->firstOrCreate($taskReportDetails);
    }
}
