import { House } from "./House";
import { getHouseData, type House as HouseList } from './usersData'
import { useEffect, useState } from "react";

interface ListingProps {
    housesProp?: HouseList[];
}

export function Listing({housesProp = []}: ListingProps) {
    /*const [houses, setHouses] = useState<HouseList[]>([]);

    useEffect(() => {
        getHouseData().then(data => setHouses(data))
    }, []);*/
    return(
        <div>
            {housesProp.filter(h => h.hasCandy).map(house => (
                <House id={house.id} name={house.name} address={house.address} sensitivities={house.sensitivities} hasCandy={house.hasCandy}></House >))}
            {housesProp.filter(h => !h.hasCandy).map(house => (
                <House id={house.id} name={house.name} address={house.address} sensitivities={house.sensitivities} hasCandy={house.hasCandy}></House >))}
        </div>
    );
}