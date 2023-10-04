<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TaskReportController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::get('/project/{project_id}', [TaskReportController::class, 'index']);

    Route::get('/{id}', [TaskReportController::class, 'show']);

    Route::post('/', [TaskReportController::class, 'create']);

    Route::put('/{id}', [TaskReportController::class, 'update']);

    Route::delete('/{id}', [TaskReportController::class, 'delete']);

    Route::patch('/{id}/restore', [TaskReportController::class, 'restore']);

    Route::delete('/{id}/force', [TaskReportController::class, 'force']);
});
