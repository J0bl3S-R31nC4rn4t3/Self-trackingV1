<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Get all tasks for the logged-in user.
     * Includes optional filtering by status (Pending, Completed).
     */
    public function index(Request $request)
    {
        $query = Task::where('user_id', $request->user()->user_id);

        // Handle the filter from the frontend (e.g., /api/tasks?status=Pending)
        if ($request->has('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        // Order by priority or due date (optional)
        $tasks = $query->orderBy('created_at', 'desc')->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created task in the database.
     */
    public function store(Request $request)
    {
        // Validate the incoming data from React
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'priority' => 'nullable|string|in:Low,Medium,High',
            'is_daily' => 'boolean',
            'due_date' => 'nullable|date',
        ]);

        // Add the user_id from the authenticated user
        $validated['user_id'] = $request->user()->user_id;
        $validated['status'] = 'Pending'; // Default status

        $task = Task::create($validated);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    /**
     * Update the specified task (e.g., marking it complete).
     */
    public function update(Request $request, $task_id)
    {
        $task = Task::where('task_id', $task_id)
                    ->where('user_id', $request->user()->user_id)
                    ->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:Pending,Completed,Missed',
            'priority' => 'sometimes|string|in:Low,Medium,High',
            'is_daily' => 'boolean',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task
        ]);
    }

    /**
     * Remove the specified task from the database.
     */
    public function destroy(Request $request, $task_id)
    {
        $task = Task::where('task_id', $task_id)
                    ->where('user_id', $request->user()->user_id)
                    ->firstOrFail();

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ]);
    }
}