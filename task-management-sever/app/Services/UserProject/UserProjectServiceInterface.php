<?php

namespace App\Services\UserProject;

interface UserProjectServiceInterface
{
    public function index($options, $project_id, $user_id);

    public function show($id, $project_id, $user_id);

    public function create($project_id, $user_id);

    public function delete($project_id, $user_id);
}
