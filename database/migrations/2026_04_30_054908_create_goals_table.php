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
    Schema::create('goals', function (Blueprint $table) {
        $table->uuid('goal_id')->primary();
        $table->foreignUuid('user_id')->references('user_id')->on('users')->cascadeOnDelete();
        $table->string('title');
        $table->float('progress_percentage')->default(0.0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};
