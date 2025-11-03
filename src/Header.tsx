import { useEffect, useState } from "react";
import { getHouseStats, type HouseStats, type House as HouseList } from "./usersData";

interface ListingProps {
    housesProp?: HouseList[];
}

function StatsCalculator(houses: HouseList[]): HouseStats {
            
            const totalHouses = houses.length;
        const housesWithCandy = houses.filter(h => h.hasCandy).length;
        const sensitivitiesCount: Record<string, number> = {};
        for (const house of houses) {
            
                if (house.sensitivities in sensitivitiesCount) {
                    sensitivitiesCount[house.sensitivities] += 1;
                } else {
                    sensitivitiesCount[house.sensitivities] = 1;
                }
            
        }
        //console.log("Sensitivities count:", sensitivitiesCount);
        return {
            totalHouses,
            housesWithCandy,
            sensitivities: sensitivitiesCount
        };
    }
export function Header({housesProp = []}: ListingProps) {
    const [stats, setStats] = useState<HouseStats | null>(null);

    useEffect(() => {
        /*getHouseStats().then(setStats).catch((e) => {
            console.error("getHouseStats failed:", e);
        });*/
        setStats(StatsCalculator(housesProp));
        
    }, []);

    

    return (
        <header>
            <h1>Halloween Candy Tracker</h1>
            <div className="stats">
            <p>Houses with Candy: {stats ? `${stats.housesWithCandy}/${stats.totalHouses}` : "Loading..."}</p>
            <h3>Sensitivities:</h3>
            <ul>
                {stats ? Object.entries(stats.sensitivities).map(([sensitivity, count]) => (
                    <li>{sensitivity}: {count}</li>
                )) : <li>Loading...</li>}
            </ul>
            </div>
        </header>
    );
}