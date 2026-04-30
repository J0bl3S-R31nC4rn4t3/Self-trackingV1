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
    Schema::create('milestones', function (Blueprint $table) {
        $table->uuid('milestone_id')->primary();
        $table->foreignUuid('goal_id')->references('goal_id')->on('goals')->cascadeOnDelete();
        $table->string('title');
        $table->boolean('is_completed')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};
