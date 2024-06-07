import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Form } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";

export default function EditWanted({ auth, wanted, users }) {
    const { data, setData, put, errors } = useForm({
        Nom: wanted.Nom,
        Description: wanted.Description,
        image: wanted.image,
        Prime: wanted.Prime,
        user_id: wanted.user_id,
        Etat: wanted.Etat,
        Localisation: wanted.Localisation,
        Note: wanted.Note,
        statut: wanted.statut,
        accusations: wanted.accusations.map((accusation) => ({
            label: accusation.label,
        })),
    });

    const handleInputChange = (index, event) => {
        const values = [...data.accusations];
        values[index].label = event.target.value;
        setData("accusations", values);
    };

    const handleAddAccusation = () => {
        setData("accusations", [...data.accusations, { label: "" }]);
    };

    const handleRemoveAccusation = (index) => {
        const values = [...data.accusations];
        values.splice(index, 1);
        setData("accusations", values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Nom", data.Nom);
        formData.append("Description", data.Description);
        formData.append("image", data.image);
        formData.append("Prime", data.Prime);
        formData.append("user_id", data.user_id);
        formData.append("Etat", data.Etat);
        formData.append("Localisation", data.Localisation);
        formData.append("Note", data.Note);
        formData.append("statut", data.statut);

        // Ajoutez les données des accusations au formData
        data.accusations.forEach((accusation, index) => {
            formData.append(`accusations[${index}][label]`, accusation.label);
        });

        await put(route("wanted.update", wanted.id), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Éditer un Wanted
                </h2>
            }
        >
            <Head title="Éditer un Wanted" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="Nom"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nom
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="Nom"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Nom}
                                        onChange={(e) =>
                                            setData("Nom", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.Nom && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.Nom}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="Description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="Description"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Description}
                                        onChange={(e) =>
                                            setData(
                                                "Description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                {errors.Description && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.Description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Image
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="image"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.image}
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.image && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="Prime"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Prime
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        id="Prime"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Prime}
                                        onChange={(e) =>
                                            setData("Prime", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.Prime && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.Prime}
                                    </p>
                                )}
                            </div>

                            {/* <div>
                                <label
                                    htmlFor="user_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    User
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="user_id"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData("user_id", e.target.value)
                                        }
                                    >
                                        <option value="">Select User</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.user_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div> */}

                            <div>
                                <label
                                    htmlFor="Etat"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Etat
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="Etat"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Etat}
                                        onChange={(e) =>
                                            setData("Etat", e.target.value)
                                        }
                                    >
                                        <option value="Vif">Vif</option>
                                        <option value="Mort">Mort</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="Localisation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Localisation
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="Localisation"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Localisation}
                                        onChange={(e) =>
                                            setData(
                                                "Localisation",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                {errors.Localisation && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.Localisation}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="Note"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Note
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="Note"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.Note}
                                        onChange={(e) =>
                                            setData("Note", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.Note && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.Note}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="statut"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Statut
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="statut"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.statut}
                                        onChange={(e) =>
                                            setData("statut", e.target.value)
                                        }
                                    >
                                        <option value="En ligne">
                                            En ligne
                                        </option>
                                        <option value="Hors ligne">
                                            Hors ligne
                                        </option>
                                        <option value="Terminé">Terminé</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="accusations"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Accusations
                                </label>
                                {data.accusations.map((accusation, index) => (
                                    <div
                                        key={index}
                                        className="mt-1 flex items-center space-x-2"
                                    >
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={accusation.label}
                                            onChange={(e) =>
                                                handleInputChange(index, e)
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() =>
                                                handleRemoveAccusation(index)
                                            }
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                    onClick={handleAddAccusation}
                                >
                                    Ajouter une accusation
                                </button>
                            </div>

                            <input type="hidden" value={wanted.id} />

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Modifier
                                </button>
                                <a
                                    href={route("dashboard")}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Retour
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
