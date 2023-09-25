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
        Schema::create('task_reports', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('task_id');
            $table->string('title');
            $table->string('description');
            $table->integer('status'); // range 0 - 100
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_reports');
    }
};
