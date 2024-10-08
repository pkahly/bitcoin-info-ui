import React from 'react';
import { useState, useEffect } from 'react';
import { getInput } from '../util/Utils.ts';

export default function GetPrice() {
    const [priceInfo, setPriceInfo] = useState("");

    useEffect(() => {
        getPriceInfo();
      }, []);

    const getPriceInfo = async () => {
        let date = getInput("dateInput")
        if (!date) {
            setPriceInfo("")
            return
        }

        const response = await fetch(`http://localhost:8080/price/${date}`)
        if (response.ok && response.status == 200) {
            const priceJson = await response.json();
            setPriceInfo(JSON.stringify(priceJson));
        } else if (response.status == 204) {
            setPriceInfo("No Data")
        } else {
            console.error(response)
            setPriceInfo("An error occurred")
        }
    }

    return (
        <div>
            <p>{priceInfo}</p>

            <label>
                Date: <input id="dateInput" defaultValue="2022-11-13" />
            </label>
            <button onClick={getPriceInfo}>Submit</button>
        </div>
    )
}