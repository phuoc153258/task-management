<?php

namespace App\Repositories\Task;

interface TaskRepositoryInterface
{
    public function list($options, $project_id, $user_id);

    public function show(int $id, $user_id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);
}
