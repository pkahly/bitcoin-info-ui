import React from 'react';
import { useState, useEffect } from 'react';
import { getInput } from '../util/Utils.ts';
import JSONTable from './JSONTable.tsx';
import CandleStick from './charts/CandleStick.tsx';

export class PriceInfo {
    dateStr:string
    open:string
    high:string
    low:string
    close:string
}

enum RangeType {
    DAY,
    MONTH,
    YEAR
}

export default function GetPriceRange() {
    const [priceInfo, setPriceInfo] = useState<PriceInfo[]>([]);
    const [rangeType, setRangeType] = useState<RangeType>(RangeType.DAY);

    useEffect(() => {
        getPriceRangeInfo();
    }, []);

    const getPriceRangeInfo = async () => {
        let startDate = getInput("dateInputStart")
        let endDate = getInput("dateInputEnd")

        if (!startDate || !endDate) {
            console.warn("Dates are required")
            return
        }

        const response = await fetch(`http://localhost:8080/price/${startDate}/${endDate}?rangeType=${RangeType[rangeType]}`)
        if (response.ok && response.status == 200) {
            const priceJson:PriceInfo = await response.json();
            setPriceInfo(priceJson);
        } else if (response.status == 204) {
            console.log("No Data")
        } else {
            console.error(response)
        }
    }

    return (
        <div>
            <CandleStick
                priceInfo = {priceInfo}
            />

            <br />
            <br />

            <label>
                Start Date: <input id="dateInputStart" defaultValue="2022-11-01" />
                End Date: <input id="dateInputEnd" defaultValue="2022-11-14" />
            </label>

            <br />
            <br />

            <label htmlFor="dayType">Day</label>
            <input type="radio" id="dayType" name="rangeType" checked={rangeType === 0} onChange={() => setRangeType(0)} />

            <label htmlFor="monthType">Month</label>
            <input type="radio" id="monthType" name="rangeType" checked={rangeType === 1} onChange={() => setRangeType(1)} />

            <label htmlFor="yearType">Year</label>
            <input type="radio" id="yearType" name="rangeType" checked={rangeType === 2} onChange={() => setRangeType(2)} />

            <br />
            <br />

            <button onClick={getPriceRangeInfo}>Submit</button>

            <br />
            <br />
        
            <JSONTable 
                data = {priceInfo}
                uniqueKey = "dateStr"
            />
        </div>
    )
}