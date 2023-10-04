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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->date('leave_registration_date')->nullable();
            $table->integer('status')->default(0); // Status of the request: 0 pending | 1 accept | 2 reject
            $table->integer('accept_by')->nullable();
            $table->integer('user_id');
            $table->integer('leave_request_type_id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::dropIfExists('leave_requests');
    }
};
