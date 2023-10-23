<?php

namespace App\Repositories\TaskReport;

use App\Models\TaskReport\TaskReport;
use App\Repositories\TaskReport\TaskReportRepositoryInterface;

class TaskReportRepository implements TaskReportRepositoryInterface
{
    public function list($options, $user_id)
    {
        return TaskReport::query()
            ->with(['task'])
            ->ofUser($user_id)
            ->when(!empty($options['task_id']), function ($query) use ($options) {
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
    }

    public function show($id, $user_id)
    {
        return TaskReport::with('task')->ofUser($user_id)->findOrFail($id);
    }

    public function create($taskReportDetails, $user_id)
    {
        return TaskReport::with('task')->firstOrCreate($taskReportDetails);
    }

    public function getLasted($id)
    {
        return TaskReport::latest('updated_at')->where('task_id', $id)->first();
    }
}
