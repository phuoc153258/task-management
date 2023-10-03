<?php

namespace App\Services\Admin\Project;

use App\Repositories\Admin\Project\ProjectRepositoryInterface;

class ProjectService implements ProjectServiceInterface
{
    public function __construct(private ProjectRepositoryInterface $projectRepository)
    {
    }

    public function index($options)
    {
        return $this->projectRepository->list($options);
    }

    public function show($id)
    {
        return $this->projectRepository->show($id);
    }

    public function create($projectDetails)
    {
        return $this->projectRepository->create($projectDetails);
    }

    public function update($projectDetails, $id)
    {
        $project = $this->projectRepository->show($id);

        $project->update($projectDetails);

        return $project;
    }

    public function delete($id)
    {
        $project = $this->projectRepository->show($id);

        $project->delete();

        return $project;
    }

    public function restore($id)
    {
        $project = $this->projectRepository->show($id);
        $project->restore();

        return $project;
    }

    public function force($id)
    {
        $project = $this->projectRepository->show($id);
        $project->forceDelete();

        return $project;
    }
}
