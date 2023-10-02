<?php

namespace App\Repositories\Admin\Task;

interface TaskRepositoryInterface
{
    public function list($options, $project_id);

    public function getById(int $id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);

    public function deleteMany($user_id);
}
