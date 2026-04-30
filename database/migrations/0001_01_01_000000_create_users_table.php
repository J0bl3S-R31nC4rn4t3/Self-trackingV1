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
    Schema::create('users', function (Blueprint $table) {
        $table->uuid('user_id')->primary();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password_hash');
        $table->boolean('dark_mode_enabled')->default(false);
        $table->boolean('notifications_enabled')->default(true);
        $table->integer('current_streak')->default(0);
        $table->timestamps();
    });

    // You can leave the default password_reset_tokens and sessions tables 
    // that Laravel includes in this file as they are.
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
