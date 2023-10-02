<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TaskController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::get('/project/{project_id}', [TaskController::class, 'index']);

    Route::get('/{id}', [TaskController::class, 'show']);

    Route::post('/', [TaskController::class, 'create']);

    Route::put('/{id}', [TaskController::class, 'update']);

    Route::delete('/{id}', [TaskController::class, 'delete']);
});
