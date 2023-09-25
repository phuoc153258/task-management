<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;


Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/', [ProjectController::class, 'index']);

    Route::get('/{id}', [ProjectController::class, 'show']);
});
