import React from 'react'

const Selection = ({ options, add }) => {

    return (
        <div>
            <select onChange={event => add({
                value: event.target.value,
                title: event.target.options[event.target.selectedIndex].text,
                id: Date.now()
            })}>
                <option selected value >Tags</option>
                {options.map((item, index) =>
                    <option value={item.value} key={item.value}>{item.title} </option>
                )}
            </select>
        </div>

    );
}

export default Selection;
