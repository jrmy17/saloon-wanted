<?php

namespace App\Http\Controllers;

use App\Models\Wanted;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $wanted = Wanted::with(['user', 'accusations'])->get();
        return Inertia::render('Dashboard', ['wanted' => $wanted]);
    }
}
