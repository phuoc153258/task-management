<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\ListTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\TaskResource;
use App\Services\Task\TaskService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class TaskController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private TaskService $taskService)
    {
    }

    public function index(ListTaskRequest $request, $project_id)
    {
        try {
            $user = $this->getCurrentUser();
            $taskResponse = $this->taskService->index($request->validated(), $project_id, $user->id);

            return $this->success(new PaginateResource($taskResponse, TaskResource::collection($taskResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $user = $this->getCurrentUser();
            $projectResponse = $this->taskService->show($id, $user->id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create(CreateTaskRequest $request)
    {
        try {
            $projectResponse = $this->taskService->create($request->validated());

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $projectResponse = $this->taskService->update($request->validated(), $id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function delete($id)
    {
        try {
            $projectResponse = $this->taskService->delete($id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
