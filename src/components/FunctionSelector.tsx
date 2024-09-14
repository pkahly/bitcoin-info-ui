import React from 'react';
import { useState, useEffect } from 'react';
import GetPrice from './GetPrice.tsx';

export default function FuctionSelector():JSX.Element {
    const [type, setType] = useState(0);

    function typeSelector() {
        return (
            <div>
                <p>Choose an endpoint</p>

                <label htmlFor="empty">Empty</label>
                <input type="radio" id="empty" name="type" checked={type === 0} onChange={() => setType(0)} />
                
                <label htmlFor="getPrice">getPrice</label>
                <input type="radio" id="getPrice" name="type" checked={type === 1} onChange={() => setType(1)} />
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
        } else {
            return typeSelector()
        }
    }

    return render();
}