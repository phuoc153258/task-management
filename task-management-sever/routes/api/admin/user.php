<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {

    Route::get('/', [UserController::class, 'index']);

    Route::get('/{id}', [UserController::class, 'show']);

    Route::post('/', [UserController::class, 'create']);

    Route::put('/{id}', [UserController::class, 'update']);

    Route::post('/{id}/avatar', [UserController::class, 'avatar']);

    Route::put('/{id}/password', [UserController::class, 'password']);

    Route::delete('/{id}', [UserController::class, 'delete']);
});
