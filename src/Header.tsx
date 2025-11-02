import { useEffect, useState } from "react";
import { getHouseStats, type HouseStats } from "./usersData";


export function Header() {
    const [stats, setStats] = useState<HouseStats | null>(null);

    useEffect(() => {
        getHouseStats().then(setStats).catch((e) => {
            console.error("getHouseStats failed:", e);
        });
    }, []);
    

    return (
        <header>
            <h1>Halloween Candy Tracker</h1>
            <p>Total Houses: {stats ? stats.totalHouses : "Loading..."}</p>
            <p>Houses with Candy: {stats ? stats.housesWithCandy : "Loading..."}</p>
            <h3>Sensitivities:</h3>
            <ul>
                {stats ? Object.entries(stats.sensitivities).map(([sensitivity, count]) => (
                    <li key={sensitivity}>{sensitivity}: {count}</li>
                )) : <li>Loading...</li>}
            </ul>
        </header>
    );
}