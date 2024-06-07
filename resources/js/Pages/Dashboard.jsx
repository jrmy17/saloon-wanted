import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Table, Button } from "react-bootstrap";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function Dashboard({ auth, wanted }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (
            window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")
        ) {
            destroy(route("wanted.destroy", id));
        }
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleShowFullDescription = () => {
        setShowFullDescription(true);
    };

    const handleHideFullDescription = () => {
        setShowFullDescription(false);
    };

    const [showFullNote, setShowFullNote] = useState(false);

    const handleShowFullNote = () => {
        setShowFullNote(true);
    };

    const handleHideFullNote = () => {
        setShowFullNote(false);
    };

    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredData = wanted.filter((item) =>
        item.Nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center mb-5 justify-between">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder="Rechercher par nom"
                                className="p-2 mb-5 border border-gray-300 rounded-md"
                            />
                            <Link
                                href={route("wanted.create")}
                                className="mb-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Ajouter un wanted
                            </Link>
                        </div>
                        <Table className="divide-y divide-gray-200 w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th style={{ padding: "0 10px" }}>ID</th>
                                    <th style={{ padding: "0 10px" }}>Nom</th>
                                    <th style={{ padding: "0 10px" }}>
                                        Description
                                    </th>
                                    <th style={{ padding: "0 10px" }}>Image</th>
                                    <th style={{ padding: "0 10px" }}>Prime</th>
                                    <th style={{ padding: "0 10px" }}>Etat</th>
                                    <th style={{ padding: "0 10px" }}>
                                        Localisation
                                    </th>
                                    <th style={{ padding: "0 10px" }}>Note</th>
                                    <th style={{ padding: "0 10px" }}>
                                        Statut
                                    </th>
                                    <th style={{ padding: "0 10px" }}>
                                        Accusations
                                    </th>
                                    <th style={{ padding: "0 10px" }}>
                                        Créateur
                                    </th>
                                    <th style={{ padding: "0 10px" }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-100 text-center align-top"
                                                : "text-center"
                                        }
                                    >
                                        <td style={{ padding: "0 10px" }}>
                                            {item.id}
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            {item.Nom}
                                        </td>
                                        <td
                                            style={{ padding: "0 10px" }}
                                            className="max-w-72"
                                        >
                                            {showFullDescription
                                                ? item.Description
                                                : item.Description.substring(
                                                      0,
                                                      50
                                                  )}
                                            {item.Description.length > 100 && (
                                                <button
                                                    onClick={
                                                        showFullDescription
                                                            ? handleHideFullDescription
                                                            : handleShowFullDescription
                                                    }
                                                    className="text-blue-500"
                                                >
                                                    {showFullDescription
                                                        ? "Réduire"
                                                        : "Voir plus"}
                                                </button>
                                            )}
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            <img
                                                src={item.image}
                                                alt={item.Nom}
                                                width="50"
                                                className="inline"
                                            />
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            {item.Prime}
                                        </td>

                                        <td style={{ padding: "0 10px" }}>
                                            {item.Etat}
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            {item.Localisation}
                                        </td>
                                        <td
                                            style={{ padding: "0 10px" }}
                                            className="max-w-72"
                                        >
                                            {showFullNote
                                                ? item.Note
                                                : item.Note.substring(0, 50)}
                                            {item.Note.length > 100 && (
                                                <button
                                                    onClick={
                                                        showFullNote
                                                            ? handleHideFullNote
                                                            : handleShowFullNote
                                                    }
                                                    className="text-blue-500"
                                                >
                                                    {showFullNote
                                                        ? "Réduire"
                                                        : "Voir plus"}
                                                </button>
                                            )}
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            {item.statut}
                                        </td>

                                        <td style={{ padding: "0 10px" }}>
                                            <ul>
                                                {item.accusations.map(
                                                    (accusation) => (
                                                        <li key={accusation.id}>
                                                            {accusation.label}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </td>
                                        <td style={{ padding: "0 10px" }}>
                                            {item.user
                                                ? item.user.name
                                                : "Unknown"}
                                        </td>
                                        <td
                                            style={{ padding: "0 10px" }}
                                            className="flex justify-center "
                                        >
                                            <Link
                                                href={route(
                                                    "wanted.edit",
                                                    item.id
                                                )}
                                                className="btn btn-secondary p-2"
                                            >
                                                <FiEdit2 />
                                            </Link>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="p-2 text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash2 />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
