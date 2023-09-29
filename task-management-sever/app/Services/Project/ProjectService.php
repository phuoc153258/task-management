<?php

namespace App\Services\Project;

use App\Repositories\Project\ProjectRepositoryInterface;

class ProjectService implements ProjectServiceInterface
{
    public function __construct(private ProjectRepositoryInterface $projectRepository)
    {
    }

    public function index($options, $user_id)
    {
        return $this->projectRepository->list($options, $user_id);
    }

    public function show($id, $user_id)
    {
        return $this->projectRepository->getById($id, $user_id);
    }
}
