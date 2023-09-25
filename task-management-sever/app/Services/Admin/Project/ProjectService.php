<?php

namespace App\Services\Admin\Project;

use App\Repositories\Admin\Project\ProjectRepositoryInterface;

class ProjectService implements ProjectServiceInterface
{
    private $projectRepository;

    public function __construct(ProjectRepositoryInterface $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index($options)
    {
        return $this->projectRepository->index($options);
    }

    public function show($id)
    {
        $projectResponse = $this->projectRepository->show($id);
        if (empty($projectResponse))
            abort(400, trans('base.base-failed'));

        return $projectResponse;
    }
}
