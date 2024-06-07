import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useState } from "react";
import WantedCard from "@/Components/WantedCard";

export default function Wanted({ auth, wanted }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredData = wanted.filter((item) =>
        item.Nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Head title="Wanted" />
            <div className="background-wall text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center">
                    <div className="relative w-full px-6">
                        <nav className="flex items-center gap-6 lg:gap-8 top-0 inset-x-0 z-10 justify-between p-2">
                            <ApplicationLogo className="block h-16 w-auto fill-current text-black dark:text-white" />
                            <h1 className="font-rdr text-4xl text-white planche">
                                Wanted
                            </h1>
                            <div className="w-16"></div>
                        </nav>
                        <div className="flex flex-col items-center mt-2">
                            <div className="relative w-full max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Rechercher un joueur"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    className="noborder w-full px-4 py-2 text-white bg-black bg-opacity-45 dark:bg-black/70 border border-black dark:border-white/70 rounded-lg focus:outline-none placeholder-white placeholder-opacity-55"
                                />
                            </div>
                        </div>
                        <main className="mt-16 min-h-[50svh]">
                            <div className="flex flex-wrap justify-center gap-6 mt-8">
                                {filteredData.length === 0 && (
                                    <div className="text-center w-full">
                                        <h2 className="text-xl font-bold text-white dark:text-white">
                                            Pas de Wanted trouvé
                                        </h2>
                                    </div>
                                )}
                                {filteredData.map((item, index) => (
                                    <WantedCard key={index} wanted={item} />
                                ))}
                            </div>
                        </main>
                        <div className="mt-16 text-center bottom-0">
                            <div className="flex items-center justify-center gap-4">
                                <ApplicationLogo className="block h-11 w-auto fill-current text-white dark:text-white" />
                            </div>
                            <footer className="py-2 text-center text-sm text-white dark:text-white/70">
                                Saloon RôlePlay - Tous droits réservés
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
