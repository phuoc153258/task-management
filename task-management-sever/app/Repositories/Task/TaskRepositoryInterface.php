<?php

namespace App\Repositories\Task;

interface TaskRepositoryInterface
{
    public function list($options, $project_id, $user_id);

    public function getById(int $id, $project_id, $user_id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);
}
