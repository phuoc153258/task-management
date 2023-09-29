<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::group(['middleware' => ['auth:api']], function () {

    Route::put('/', [UserController::class, 'update']);

    Route::post('/avatar', [UserController::class, 'avatar']);

    Route::put('/password', [UserController::class, 'password']);
});
