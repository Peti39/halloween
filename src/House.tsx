import { useState } from "react";
import { changeCandyStatus } from "./usersData";



function imegizeSensitivities(sensitivities: string) {
    switch (sensitivities) {
        case "glutén":
            return "gluten🌾";
        case "laktóz":
            return "lactose🥛";
        case "diófélék":
            return "nuts🥜";
        case "tojás":
            return "egg🥚";
        default:
            return sensitivities;
    }
    
}

export function House(props: {id: number, name: string,address: string, sensitivities: string, hasCandy: boolean}) {

    const [candyStatus, setCandyStatus] = useState(props.hasCandy);

    async function handleChangeCandyStatus() {
        await changeCandyStatus(props.id, candyStatus);
        setCandyStatus(!candyStatus);
    } //TODO: error handling

    return (
        <div className="house-card">
            <h2>{props.address}</h2>
            <h3>{props.name}</h3>
            <p className="sens">Sensitivities: {imegizeSensitivities(props.sensitivities)}</p>
            <p className={candyStatus ? "hasCandy" : "noCandy"}>{candyStatus ? "Has Candy" : "No Candy"}</p>
            <button onClick={handleChangeCandyStatus}>{props.hasCandy ? "Ran out" : "Refilled"}</button>            
        </div>
    );
}