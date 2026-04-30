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
    Schema::create('tasks', function (Blueprint $table) {
        $table->uuid('task_id')->primary();
        $table->foreignUuid('user_id')->references('user_id')->on('users')->cascadeOnDelete();
        $table->string('title');
        $table->enum('status', ['Pending', 'Completed', 'Missed'])->default('Pending');
        $table->string('priority')->default('Medium'); // Assuming Medium is default
        $table->boolean('is_daily')->default(false);
        $table->date('due_date')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
