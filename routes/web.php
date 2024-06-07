<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WantedController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Wanted;

/* Route::get('/', function () {
    return Inertia::render('Wanted', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

Route::get('/', function () {
    $wanted = Wanted::with(['user', 'accusations'])->get();
    return Inertia::render('Wanted', ['wanted' => $wanted]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/wanted/create', [WantedController::class, 'create'])->name('wanted.create');
    Route::post('/wanted', [WantedController::class, 'store'])->name('wanted.store');
    Route::get('/wanted/{id}/edit', [WantedController::class, 'edit'])->name('wanted.edit');
    Route::put('/wanted/{id}', [WantedController::class, 'update'])->name('wanted.update');
    Route::delete('/wanted/{id}', [WantedController::class, 'destroy'])->name('wanted.destroy');
});

require __DIR__ . '/auth.php';
