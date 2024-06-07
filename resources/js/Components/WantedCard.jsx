import React from "react";
import { format } from "date-fns";
import { FaCircle } from "react-icons/fa";

const WantedCard = ({ wanted }) => {
    return (
        <div className="w-96 mx-auto bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-red-600 text-white text-center py-2 font-bold text-xl font-rdr">
                {wanted.Nom}
            </div>
            <div className="p-4">
                <div className="flex justify-center mb-4">
                    <img
                        className="h-48 w-48 object-cover rounded-full border-4 border-red-600"
                        src={wanted.image}
                        alt={wanted.Nom}
                    />
                </div>
                <div className="text-center text-xl font-bold text-red-700 font-rdr">
                    Prime : ${wanted.Prime}
                </div>
                <div className="mt-2 text-center">
                    <span className="font-bold">{wanted.Etat}</span>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-red-700">
                        Recherché par les autorité de{" "}
                        <span className="underline">{wanted.Localisation}</span>{" "}
                        pour :
                    </h3>
                    <ul className="list-disc list-inside ml-4">
                        {wanted.accusations.map((accusation, index) => (
                            <li key={index}>{accusation.label}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="">
                        <span className="text-lg font-semibold text-red-700">
                            Description :{" "}
                        </span>
                        {wanted.Description}
                    </h3>
                </div>
                <div className="mt-4">
                    <h3 className="">
                        <span className="text-lg font-semibold text-red-700">
                            Note :{" "}
                        </span>
                        {wanted.Note}
                    </h3>
                </div>
                <div className="mt-4">
                    <h3>
                        <span className="text-lg font-semibold text-red-700">
                            En date du :{" "}
                        </span>
                        {format(
                            new Date(wanted.created_at),
                            "dd/MM/yyyy à HH:mm"
                        )}
                    </h3>
                </div>
                <div className="mt-4 mb-2 text-center">
                    <span className="font-bold">Activité : </span>
                    {wanted.statut === "Hors ligne" ? (
                        <FaCircle className="inline text-red-500" />
                    ) : wanted.statut === "En ligne" ? (
                        <FaCircle className="inline text-green-500" />
                    ) : (
                        <FaCircle className="inline text-gray-500" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WantedCard;
