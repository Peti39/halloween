const rootUrl = 'https://retoolapi.dev/iUvG5l/data';

interface House{
    id: number;
    address: string;
    sensitivities: string;
    hasCandy: boolean;
}

interface HouseStats{
    totalHouses: number;
    housesWithCandy: number;
    sensitivities : Record<string, number>;
}

async function getHouseStats(): Promise<HouseStats> {
    const houses =  await getHouseData();
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
    console.log("Sensitivities count:", sensitivitiesCount);
    return {
        totalHouses,
        housesWithCandy,
        sensitivities: sensitivitiesCount
    };
}

async function getHouseData(): Promise<House[]> {
    //TODO: error handling
    const response = await fetch(rootUrl);
    const data = await response.json();
    return data;
}

async function changeCandyStatus(id: number, hasCandy: boolean) {
    const response = await fetch(`${rootUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hasCandy: !hasCandy }),
    });
    //TODO: error handling
    const data = await response.json();
    //return data;

}
export { getHouseData, changeCandyStatus, getHouseStats , type House, type HouseStats };