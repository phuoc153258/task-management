<?php

namespace App\Services\Task;

interface TaskServiceInterface
{
    public function index($options, $user_id);

    public function show($id, $user_id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);
}
