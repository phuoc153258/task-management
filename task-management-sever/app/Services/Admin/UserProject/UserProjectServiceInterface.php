<?php

namespace App\Services\Admin\UserProject;

interface UserProjectServiceInterface
{
    public function index($options, $project_id);

    public function list($project_id);

    public function create($project_id, $user_id);

    public function delete($project_id, $user_id);
}
