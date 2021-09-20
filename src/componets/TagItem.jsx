import React from 'react'

const TagItem = ({ tag, remove }) => {

    if (tag === "") { tag = 'Missed' }

    return (
        <div className="TagItem">
            <p onClick={() => remove(tag)}>
                {tag}
            </p>
        </div>
    );
}

export default TagItem;
