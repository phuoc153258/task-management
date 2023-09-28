<?php

namespace App\Repositories\UserProject;

interface UserProjectRepositoryInterface
{
    public function list($options, $project_id);

    public function getById(int $id, $project_id);

    public function getUserHasJoined($project_id, $user_id);

    public function create($project_id, $user_id);
}
