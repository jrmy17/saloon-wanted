<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wanted extends Model
{
    use HasFactory;

    protected $table = 'wanted';

    protected $fillable = [
        'Nom',
        'Description',
        'image',
        'Prime',
        'user_id',
        'Etat',
        'Localisation',
        'Note',
        'statut'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function accusations()
    {
        return $this->hasMany(Accusation::class);
    }
}
