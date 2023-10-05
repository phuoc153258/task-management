<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskReportController;

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/task/{id}', [TaskReportController::class, 'index']);

    Route::get('/{id}', [TaskReportController::class, 'show']);

    Route::post('/', [TaskReportController::class, 'create']);

    Route::put('/{id}', [TaskReportController::class, 'update']);

    Route::delete('/{id}', [TaskReportController::class, 'delete']);
});
