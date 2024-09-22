import React from 'react';

export default function JSONTable({data, uniqueKey}) {
    function getHeadings(data) {
        if (!data || !data[0]) {
            return
        }

        // Loop over the keys of the first object
        return Object.keys(data[0]).map(key => {
            // Generate the <th> element
            return <th key={key}>{key}</th>;
        });
    }

    function getRows(data: []) {
        if (!data) {
            return
        }

        // Loop over the objects
        return data.map(obj => {
            // Generate <tr> element with children
            return <tr key={obj[uniqueKey]}>{getCells(obj)}</tr>;
        });
    }

    function getCells(obj) {
        if (!obj) {
            return
        }
        
        // Loop over the values of each object
        let index = 0
        return Object.values(obj).map(value => {
            // Generate unique key
            let uniqueKeyStr = `${obj[uniqueKey]}-${index}`
            index += 1

            // Generate <td> element
            return <td key={uniqueKeyStr}>{value}</td>;
        });
    }

    return (
        <table>
            <thead>
                <tr>{getHeadings(data)}</tr>
            </thead>
            <tbody>{getRows(data)}</tbody>
        </table>
    )
}