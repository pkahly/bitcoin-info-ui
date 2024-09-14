import React from 'react';
import { useState, useEffect } from 'react';

export default function Price() {
    const [priceInfo, setPriceInfo] = useState("");

    useEffect(() => {
        getPriceInfo();
      }, []);

    const getPriceInfo = async () => {
        let inputElement = document.getElementById("dateInput") as HTMLInputElement
        if (!inputElement) {
            console.error("Failed to load input element")
            return
        }

        let date = inputElement.value
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
            <hr></hr>

            <label>
                Date: <input id="dateInput" defaultValue="2022-11-13" />
            </label>
            <button onClick={getPriceInfo}>Submit</button>
        </div>
    )
}