<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('activity_logs', function (Blueprint $table) {
        $table->uuid('log_id')->primary();
        $table->foreignUuid('user_id')->references('user_id')->on('users')->cascadeOnDelete();
        
        // Nullable foreign key as specified in your ERD
        $table->foreignUuid('task_id')->nullable()->references('task_id')->on('tasks')->nullOnDelete();
        
        $table->date('log_date');
        $table->string('action_type'); // e.g., "Task Completed", "Task Missed"
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
