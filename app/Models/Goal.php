<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Goal extends Model
{
    use HasUuids;

    protected $primaryKey = 'goal_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'title', 'progress_percentage'];

    public function milestones()
    {
        return $this->hasMany(Milestone::class, 'goal_id', 'goal_id');
    }
}