import React from "react";
import { format } from "date-fns";
import { FaCircle } from "react-icons/fa";

const WantedCard = ({ wanted }) => {
    return (
        <div className="wanted-card w-96 mx-auto shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="text-amber-950 text-center py-2 font-bold text-4xl font-rdr">
                {wanted.Nom}
            </div>
            <div className="font-semibold">
                <div className="flex justify-center mb-4">
                    <img
                        className="h-48 w-48 object-cover rounded-full border-4 border-amber-950  bg-amber-950"
                        src={wanted.image}
                    />
                </div>
                <div className="text-center text-xl text-white font-rdr planche2">
                    Prime : ${wanted.Prime}
                </div>
                <div className="mt-2 text-center">
                    <span className="font-semibold">{wanted.Etat}</span>
                </div>
                <div className="mt-2 font-semibold">
                    <h3 className="text-lg font-semibold text-amber-950">
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
                <div className="mt-2">
                    <h3 className="font-semibold">
                        <span className="text-lg font-semibold text-amber-950">
                            Description :{" "}
                        </span>
                        {wanted.Description}
                    </h3>
                </div>
                <div className="mt-2">
                    <h3 className="">
                        <span className="text-lg font-semibold text-amber-950">
                            Note :{" "}
                        </span>
                        {wanted.Note}
                    </h3>
                </div>
                <div className="mt-2">
                    <h3>
                        <span className="text-lg font-semibold text-amber-950">
                            En date du :{" "}
                        </span>
                        {format(
                            new Date(wanted.created_at),
                            "dd/MM/yyyy à HH:mm"
                        )}
                    </h3>
                </div>
                <div className="mt-2 mb-2 text-center">
                    <span className="font-bold text-amber-950">
                        Activité :{" "}
                    </span>
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
