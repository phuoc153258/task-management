<?php

namespace App\Repositories\UserProject;

interface UserProjectRepositoryInterface
{
    public function getList($options, $project_id);

    public function getById(int $id, $project_id);

    public function getUserHasJoined($project_id, $user_id);
}
