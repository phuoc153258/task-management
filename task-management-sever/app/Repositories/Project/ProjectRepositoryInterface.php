<?php

namespace App\Repositories\Project;

interface ProjectRepositoryInterface
{
    public function getList($options, $user_id);
    public function getById(int $id, $user_id);
}
