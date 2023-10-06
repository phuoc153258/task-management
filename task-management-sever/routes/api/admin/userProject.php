<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserProjectController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::get('/project/{project_id}', [UserProjectController::class, 'index']);

    Route::post('/project/{project_id}/user/{user_id}', [UserProjectController::class, 'create']);

    Route::delete('/project/{project_id}/user/{user_id}', [UserProjectController::class, 'delete']);

    Route::delete('/project/{project_id}/user/{user_id}/restore', [UserProjectController::class, 'restore']);

    Route::delete('/project/{project_id}/user/{user_id}/force', [UserProjectController::class, 'force']);
});
