<?php

namespace App\Http\Controllers;

use App\Repositories\Task\TaskRepositoryInterface;
use App\Services\Task\TaskService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use HttpResponsable, Authorizable;
    private TaskService $taskService;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskService =  new TaskService($taskRepository);
    }

    public function index(Request $request, $project_id)
    {
        try {
            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'content',
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'sort_by' => empty($request->input('sort_by')) ? 'id' : $request->input('sort_by'),
                'select' => ['*']
            ];
            $projectResponse = $this->taskService->index($options, $project_id);
            return $this->success($projectResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id, $project_id)
    {
        try {
            $projectResponse = $this->taskService->show($id, $project_id);
            return $this->success($projectResponse, trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
