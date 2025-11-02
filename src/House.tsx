import { useState } from "react";
import { changeCandyStatus } from "./usersData";



function imegizeSensitivities(sensitivities: string[]) {
    const sensitivityMap : Record<string,string> = {
        glutén : "🌾",
        laktóz : "🥛",
        diófélék : "🥜",
        tojás : "🥚"
    }
    return sensitivities.map(s => sensitivityMap[s] || s).join(" ");

    
}

export function House(props: {id: number, address: string, sensitivities: string[], hasCandy: boolean}) {

    const [candyStatus, setCandyStatus] = useState(props.hasCandy);

    async function handleChangeCandyStatus() {
        await changeCandyStatus(props.id, candyStatus);
        setCandyStatus(!candyStatus);
    } //TODO: error handling

    return (
        <div className="house-card">
            <h2>{props.address}</h2>
            <p>Sensitivities: {imegizeSensitivities(props.sensitivities)}</p>
            <p>{candyStatus ? "Has Candy" : "No Candy"}</p>
            <button onClick={handleChangeCandyStatus}>{props.hasCandy ? "Ran out" : "Refilled"}</button>            
        </div>
    );
}