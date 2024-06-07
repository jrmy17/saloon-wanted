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
        Schema::create('wanted', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('Nom');
            $table->string('Description', 1000);
            $table->string('image', 5000);
            $table->integer('Prime');
            $table->foreignId('user_id')->constrained();
            $table->enum('Etat', ['Vif', 'Mort']);
            $table->string('Localisation');
            $table->string('Note', 1000);
            $table->enum('statut', ['En ligne', 'Hors ligne', 'Terminé']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wanted');
    }
};
