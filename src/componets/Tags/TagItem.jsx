import React from 'react'
import './tags.css'

const TagItem = ({tag, remove}) => {

    if (tag === "") {
        tag='Missed'
    }

    return (
        <div className="tag">
            <p onClick={() => remove(tag)}>
                {tag}
            </p>
        </div>

    );
}

export default TagItem;
