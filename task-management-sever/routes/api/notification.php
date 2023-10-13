<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/', [NotificationController::class, 'index']);

    Route::patch('/{id}', [NotificationController::class, 'update']);
});
