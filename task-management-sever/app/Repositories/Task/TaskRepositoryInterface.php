<?php

namespace App\Repositories\Task;

interface TaskRepositoryInterface
{
    public function getList($options, $project_id);

    public function getById(int $id, $project_id);
}
