<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Milestone;
use Illuminate\Http\Request;

class GoalController extends Controller
{
    public function index(Request $request)
    {
        // Fetch goals and load their associated milestones
        $goals = Goal::with('milestones')
                     ->where('user_id', $request->user()->user_id)
                     ->get();

        return response()->json($goals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'milestones' => 'required|array',
            'milestones.*' => 'required|string|max:255',
        ]);

        $goal = Goal::create([
            'user_id' => $request->user()->user_id,
            'title' => $validated['title'],
            'progress_percentage' => 0
        ]);

        // Create the associated milestones
        foreach ($validated['milestones'] as $milestoneTitle) {
            Milestone::create([
                'goal_id' => $goal->goal_id,
                'title' => $milestoneTitle,
                'is_completed' => false
            ]);
        }

        return response()->json($goal->load('milestones'), 201);
    }

    public function updateMilestone(Request $request, $goal_id, $milestone_id)
    {
        // Ensure the goal belongs to the user
        $goal = Goal::where('goal_id', $goal_id)
                    ->where('user_id', $request->user()->user_id)
                    ->firstOrFail();

        $milestone = Milestone::where('milestone_id', $milestone_id)
                              ->where('goal_id', $goal->goal_id)
                              ->firstOrFail();

        $validated = $request->validate([
            'is_completed' => 'required|boolean'
        ]);

        $milestone->update(['is_completed' => $validated['is_completed']]);

        // Recalculate goal progress
        $totalMilestones = Milestone::where('goal_id', $goal->goal_id)->count();
        $completedMilestones = Milestone::where('goal_id', $goal->goal_id)->where('is_completed', true)->count();
        
        $progress = $totalMilestones > 0 ? round(($completedMilestones / $totalMilestones) * 100) : 0;
        
        $goal->update(['progress_percentage' => $progress]);

        return response()->json([
            'message' => 'Milestone updated',
            'goal' => $goal->load('milestones')
        ]);
    }
}