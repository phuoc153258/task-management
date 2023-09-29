<?php

namespace App\Services\UserProject;

interface UserProjectServiceInterface
{
    public function index($options, $project_id, $user_id);

    public function create($project_id, $user_id, $current_user_id);

    public function delete($project_id, $user_id, $current_user_id);
}
