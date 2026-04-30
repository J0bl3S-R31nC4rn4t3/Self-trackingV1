<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Milestone extends Model
{
    use HasUuids;

    protected $primaryKey = 'milestone_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['goal_id', 'title', 'is_completed'];
    
    // Cast boolean so React receives true/false instead of 1/0
    protected $casts = [
        'is_completed' => 'boolean',
    ];
}