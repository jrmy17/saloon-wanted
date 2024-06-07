<?php

namespace App\Http\Controllers;

use App\Models\Wanted;
use App\Models\Accusation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WantedController extends Controller
{
    public function index()
    {
        $wanted = Wanted::with(['user', 'accusations'])->get();
        return Inertia::render('Wanted', ['wanted' => $wanted]);
    }

    public function create()
    {
        $users = User::all();
        return Inertia::render('CreateWanted', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'Nom' => 'required|string|max:100',
            'Description' => 'required|string|max:1000',
            'image' => 'required|string|max:5000',
            'Prime' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            'Etat' => 'required|in:Vif,Mort',
            'Localisation' => 'required|string|max:100',
            'Note' => 'required|string|max:1000',
            'statut' => 'required|in:En ligne,Hors ligne,Terminé',
        ]);

        $wanted = Wanted::create([
            'Nom' => $request->Nom,
            'Description' => $request->Description,
            'image' => $request->image,
            'Prime' => $request->Prime,
            'user_id' => $request->user_id,
            'Etat' => $request->Etat,
            'Localisation' => $request->Localisation,
            'Note' => $request->Note,
            'statut' => $request->statut,
        ]);

        // Enregistrer les accusations
        foreach ($request->accusations as $accusationData) {
            if (!empty($accusationData['label'])) {
                Accusation::create([
                    'label' => $accusationData['label'],
                    'wanted_id' => $wanted->id,
                ]);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Wanted créé avec succès.');
    }
    public function edit($id)
    {
        $wanted = Wanted::with('user', 'accusations')->findOrFail($id);
        $users = User::all();
        return Inertia::render('EditWanted', [
            'wanted' => $wanted,
            'users' => $users,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'Nom' => 'required|string|max:100',
            'Description' => 'required|string|max:1000',
            'image' => 'required|string|max:1000',
            'Prime' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            'Etat' => 'required|in:Vif,Mort',
            'Localisation' => 'required|string|max:100',
            'Note' => 'required|string|max:1000',
            'statut' => 'required|in:En ligne,Hors ligne,Terminé',
        ]);

        $wanted = Wanted::findOrFail($id);
        $wanted->update($request->all());

        // Mettre à jour les accusations
        $accusations = [];
        foreach ($request->accusations as $accusationData) {
            if (!empty($accusationData['label'])) {
                if (isset($accusationData['id'])) {
                    $accusation = Accusation::findOrFail($accusationData['id']);
                    $accusation->update($accusationData);
                    $accusations[] = $accusation->id;
                } else {
                    $accusation = Accusation::create([
                        'label' => $accusationData['label'],
                        'wanted_id' => $wanted->id,
                    ]);
                    $accusations[] = $accusation->id;
                }
            }
        }

        // Supprimer les accusations qui n'ont pas été mises à jour
        Accusation::where('wanted_id', $wanted->id)
            ->whereNotIn('id', $accusations)
            ->delete();

        return redirect()->route('dashboard');
    }

    public function destroy($id)
    {
        $wanted = Wanted::findOrFail($id);
        $wanted->delete();

        return redirect()->route('dashboard');
    }
}
