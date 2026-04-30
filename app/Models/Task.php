<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Task extends Model
{
    use HasFactory, HasUuids;

    // Define the custom primary key
    protected $primaryKey = 'task_id';

    // Specify the key type and disable auto-incrementing
    protected $keyType = 'string';
    public $incrementing = false;

    // Allow these fields to be saved to the database
    protected $fillable = [
        'user_id',
        'title',
        'status',
        'priority',
        'is_daily',
        'due_date'
    ];

    // Define the relationship to the User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}