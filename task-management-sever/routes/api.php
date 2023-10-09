<?php

use App\Jobs\WelcomeMail;
use App\Mail\Welcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/mail', function (Request $request) {
    $welcomeMailJob = new WelcomeMail();
    dispatch($welcomeMailJob);
    return response()->json([
        'status' => false,
        'message' => "Welcome",
        'data' => "welcome"
    ], 200);
});
