<?php

namespace App\Repositories\Admin\Task;

use App\Models\Task;
use App\Services\Paginate\PaginateService;

class TaskRepository implements TaskRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function deleteMany($user_id, $project_id = null)
    {
        $query = Task::ofUser($user_id);

        if ($project_id != null) $query->ofProject($project_id);

        $query->chunk(100, function ($records) {
            foreach ($records as $record) {
                $record->delete();
            }
        });
    }
}
