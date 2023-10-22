<?php

namespace App\Repositories\Task;

interface TaskRepositoryInterface
{
    public function list($options, $user_id);

    public function show(int $id, $user_id);

    public function getById($id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);
}
