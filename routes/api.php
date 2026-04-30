<?php

use Illuminate\Http\Request;
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

// --- Authentication Routes ---
// (Mapping to [ FRAME: LOGIN / REGISTER ])
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// --- Protected Application Routes ---
// These routes require the user to be logged in
Route::middleware('auth:sanctum')->group(function () {
    
    // --- User Profile & Settings ---
    // (Mapping to [ FRAME: SETTINGS ])
    Route::get('/user', function (Request $request) {
        return $request->user(); // Get current user
    });
    Route::put('/user/preferences', [UserController::class, 'updatePreferences']);

    // --- Dashboard Summary ---
    // (Mapping to [ FRAME: DASHBOARD ])
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
    
    // --- Tasks ---
    // (Mapping to [ FRAME: TASK TRACKER ])
    Route::get('/tasks', [TaskController::class, 'index']); // Get all tasks (with filters)
    Route::post('/tasks', [TaskController::class, 'store']); // + Add Task
    Route::put('/tasks/{task}', [TaskController::class, 'update']); // Update status
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']); // Delete task

    // --- Goals & Milestones ---
    // (Mapping to [ FRAME: GOALS ])
    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']); // + Add Goal
    Route::put('/goals/{goal}/milestones/{milestone}', [GoalController::class, 'updateMilestone']); // Update milestone status
    Route::delete('/goals/{goal}', [GoalController::class, 'destroy']); // Delete goal

    // --- Calendar / Activity Logs ---
    // (Mapping to [ FRAME: CALENDAR ])
    Route::get('/calendar/{year}/{month}', [CalendarController::class, 'monthData']);
    Route::get('/calendar/day/{date}', [CalendarController::class, 'dayDetails']);

    // --- Analytics ---
    // (Mapping to [ FRAME: ANALYTICS ])
    Route::get('/analytics/data', [AnalyticsController::class, 'index']);
});