import React from 'react'

const Selection = ({ options, add }) => {

    return (
        <div>
            <select onChange={event => add(event.target.value)}>
                <option selected >Tags</option>
                {options.map((item, index) =>
                    <option value={item} key={item}>{item}</option>
                )}
            </select>
        </div>

    );
}

export default Selection;
