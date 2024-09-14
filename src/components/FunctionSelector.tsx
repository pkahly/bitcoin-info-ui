import React from 'react';
import { useState } from 'react';
import GetPrice from './GetPrice.tsx';
import GetPriceRange from './GetPriceRange.tsx';

export default function FuctionSelector() {
    const [type, setType] = useState(0);

    function typeSelector() {
        return (
            <div>
                <p>Choose an endpoint</p>

                <label htmlFor="empty">Empty</label>
                <input type="radio" id="empty" name="type" checked={type === 0} onChange={() => setType(0)} />
                
                <label htmlFor="getPrice">getPrice</label>
                <input type="radio" id="getPrice" name="type" checked={type === 1} onChange={() => setType(1)} />

                <label htmlFor="getPriceRange">getPriceRange</label>
                <input type="radio" id="getPriceRange" name="type" checked={type === 2} onChange={() => setType(2)} />
            </div>
        )
    }

    function render() {
        if (type == 1) {
            return (
                <div>
                    {typeSelector()}
                    <hr />
                    <GetPrice />
                </div>
            )
        } else if (type == 2) {
            return (
                <div>
                    {typeSelector()}
                    <hr />
                    <GetPriceRange />
                </div>
            )
        } else {
            return typeSelector()
        }
    }

    return render();
}