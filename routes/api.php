<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\LifeInsurancesController;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/assgin-insurance-to-user/{id}', [LifeInsurancesController::class, 'assginInsuranceToUser']);

    Route::apiResource('/users', UserController::class);
    Route::get('/lifes', [LifeInsurancesController::class, 'all']);

    Route::post('/check-national-code', [LifeInsurancesController::class, 'checkNationalCode']);

    Route::post('/life-medical-info', [LifeInsurancesController::class, 'storeLifeMedicalInfo']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/life-compare', [LifeInsurancesController::class, 'storeLifeCompare']);

Route::prefix('v1')->group(function () {
    Route::get('/get-jobs', function () {
        return Job::all()->toArray();
    });
});
