import React from 'react'
import './tags.css'

const TagItem = (props) => {

    return (
        <div className="tag">
            <p onClick={() => props.remove(props.tag)}>
                {props.tag.title}
            </p>
        </div>

    );
}

export default TagItem;
