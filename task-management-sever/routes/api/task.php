<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/project/{project_id}', [TaskController::class, 'index']);

    Route::get('/{id}/project/{project_id}', [TaskController::class, 'show']);

    Route::post('/', [TaskController::class, 'create'])->middleware('role:leader|admin');

    Route::put('/{id}', [TaskController::class, 'update'])->middleware('role:leader|admin');

    Route::delete('/{id}', [TaskController::class, 'delete'])->middleware('role:leader|admin');
});
