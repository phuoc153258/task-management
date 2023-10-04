<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserProjectController;

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/project/{project_id}', [UserProjectController::class, 'index']);

    Route::post('/project/{project_id}/user/{user_id}', [UserProjectController::class, 'create'])->middleware('role:leader|admin');

    Route::delete('/project/{project_id}/user/{user_id}', [UserProjectController::class, 'delete'])->middleware('role:leader|admin');
});
