<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function summary(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();

        // Get today's completed tasks
        $tasksCompleted = Task::where('user_id', $user->user_id)
            ->where('status', 'Completed')
            ->whereDate('updated_at', $today) // Assuming updated_at reflects completion
            ->count();

        // Get total pending tasks
        $pendingTasks = Task::where('user_id', $user->user_id)
            ->where('status', 'Pending')
            ->count();

        // Get tasks specifically scheduled for today
        $todaysTasks = Task::where('user_id', $user->user_id)
            ->where(function($query) use ($today) {
                $query->whereDate('due_date', $today)
                      ->orWhere('is_daily', true);
            })
            ->get();

        return response()->json([
            'summary' => [
                'tasks_completed' => $tasksCompleted,
                'pending_tasks' => $pendingTasks,
                'streak' => $user->current_streak,
            ],
            'todays_tasks' => $todaysTasks
        ]);
    }
}