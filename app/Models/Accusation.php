<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accusation extends Model
{
    use HasFactory;

    protected $table = 'accusation';

    protected $fillable = [
        'label',
        'wanted_id'
    ];

    public function wanted()
    {
        return $this->belongsTo(Wanted::class);
    }
}
