import React from 'react'

const Selection = ({ options, add }) => {

    return (
        <div className="Selection">
            <select title="Select tag" onChange={event => add(event.target.value)}>
                <option id="010" hidden>Tags</option>
                {options.map((item, index) =>
                    <option value={item} key={index}>{item}</option>
                )}
            </select>
        </div>
    );
}

export default Selection;
