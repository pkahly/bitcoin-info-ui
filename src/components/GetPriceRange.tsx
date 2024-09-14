import React from 'react';
import { useState, useEffect } from 'react';
import { getInput } from '../util/Utils.ts';
import JSONTable from './JSONTable.tsx';

export default function GetPriceRange() {
    const [priceInfo, setPriceInfo] = useState([]);

    useEffect(() => {
        getPriceRangeInfo();
    }, []);

    const getPriceRangeInfo = async () => {
        let startDate = getInput("dateInputStart")
        let endDate = getInput("dateInputEnd")

        if (!startDate || !endDate) {
            setPriceInfo("")
            return ""
        }

        const response = await fetch(`http://localhost:8080/price/${startDate}/${endDate}`)
        if (response.ok && response.status == 200) {
            const priceJson = await response.json();
            setPriceInfo(priceJson);
        } else if (response.status == 204) {
            setPriceInfo("No Data")
        } else {
            console.error(response)
            setPriceInfo("An error occurred")
        }
    }

    return (
        <div>
            <JSONTable 
                data = {priceInfo}
                uniqueKey = "dateStr"
            />

            <br />
            <br />
            
            <label>
                Start Date: <input id="dateInputStart" defaultValue="2022-11-01" />
                End Date: <input id="dateInputEnd" defaultValue="2022-11-14" />
            </label>
            <button onClick={getPriceRangeInfo}>Submit</button>
        </div>
    )
}