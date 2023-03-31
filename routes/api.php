<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AuthenticationController;

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
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/task/create', [TaskController::class, 'createTask']);
    Route::get('/tasks/mycreated/{userId}', [TaskController::class, 'getMyCreatedTasks']);
    Route::get('/tasks/get/{taskId}', [TaskController::class, 'getTaskById']);
    Route::get('/tasks/myassigned/{userId}', [TaskController::class, 'getMyAssignedTasks']);
    Route::get('/tasks/{department}/{userId}', [TaskController::class, 'getMyToDoTasks']);
    Route::get('/users/all', [AuthenticationController::class, 'getAllUsers']);
    Route::get('/users/{user}', [AuthenticationController::class, 'getById']);
    Route::post('/tasks/update/{taskId}', [TaskController::class, 'updateTaskToAssigneeAndInProgress']);

});
Route::get('/departments', [DepartmentController::class, 'getDepartments']);
Route::post('/tasks/finish/{taskId}', [TaskController::class, 'updateTaskToFinished']);
Route::delete('/tasks/delete/{taskId}', [TaskController::class, 'deleteTask']);
Route::post('/chat/{chatId}', [ChatController::class, 'sendMessage']);
Route::post('/users/active/{user}', [AuthenticationController::class, 'updateUserToActive']);
Route::post('/users/nonactive/{user}', [AuthenticationController::class, 'updateUserToNotActive']);