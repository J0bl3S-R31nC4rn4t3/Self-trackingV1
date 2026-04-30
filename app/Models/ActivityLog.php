<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ActivityLog extends Model
{
    use HasUuids;

    protected $primaryKey = 'log_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'task_id', 'log_date', 'action_type'];
}