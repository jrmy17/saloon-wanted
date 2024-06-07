import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";

export default function CreateWanted({ auth, users }) {
    const { data, setData, post, errors } = useForm({
        Nom: "",
        Description: "",
        image: "",
        Prime: "",
        user_id: auth.user.id,
        Etat: "Vif",
        Localisation: "",
        Note: "",
        statut: "En ligne",
        accusations: [{ label: "" }],
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("wanted.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Créer un Wanted
                </h2>
            }
        >
            <Head title="Créer un Wanted" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Form onSubmit={handleSubmit} className="space-y-6">
                            <Form.Group controlId="Nom">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Nom
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.Nom}
                                    onChange={(e) =>
                                        setData("Nom", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.Nom && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.Nom}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="Description">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Description
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={data.Description}
                                    onChange={(e) =>
                                        setData("Description", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.Description && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.Description}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Image
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.image}
                                    onChange={(e) =>
                                        setData("image", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.image && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.image}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="Prime">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Prime
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.Prime}
                                    onChange={(e) =>
                                        setData("Prime", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.Prime && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.Prime}
                                    </div>
                                )}
                            </Form.Group>
                            {/* <Form.Group controlId="user_id">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    User
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                {errors.user_id && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.user_id}
                                    </div>
                                )}
                            </Form.Group> */}
                            {/* <Form.Group controlId="user_id">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    User
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={auth.user.name}
                                    disabled
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </Form.Group> */}
                            <Form.Group controlId="Etat">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Etat
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={data.Etat}
                                    onChange={(e) =>
                                        setData("Etat", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="Vif">Vif</option>
                                    <option value="Mort">Mort</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="Localisation">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Localisation
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.Localisation}
                                    onChange={(e) =>
                                        setData("Localisation", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.Localisation && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.Localisation}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="Note">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Note
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.Note}
                                    onChange={(e) =>
                                        setData("Note", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.Note && (
                                    <div className="mt-2 text-sm text-red-600">
                                        {errors.Note}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="statut">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Statut
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={data.statut}
                                    onChange={(e) =>
                                        setData("statut", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="En ligne">En ligne</option>
                                    <option value="Hors ligne">
                                        Hors ligne
                                    </option>
                                    <option value="Terminé">Terminé</option>
                                </Form.Control>
                            </Form.Group>
                            <h3 className="block text-sm font-medium text-gray-700">
                                Accusations
                            </h3>
                            <div className="!mt-1">
                                {data.accusations.map((accusation, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder={`Accusation ${
                                                index + 1
                                            }`}
                                            value={accusation.label}
                                            onChange={(e) =>
                                                handleInputChange(index, e)
                                            }
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleRemoveAccusation(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="secondary"
                                    onClick={handleAddAccusation}
                                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                >
                                    Ajouter une accusation
                                </Button>
                            </div>
                            <input type="hidden" />
                            <div className="flex justify-between">
                                <Button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Créer
                                </Button>
                                <Button
                                    variant="primary"
                                    href={route("dashboard")}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Retour
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
