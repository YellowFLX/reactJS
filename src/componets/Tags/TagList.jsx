import React from 'react'
import TagItem from './TagItem';
import './tags.css'

const TagList = ({ tags, remove }) => {

    return (
        <div className="taglist">
            {tags.map(tag =>
                <TagItem
                    remove={remove}
                    key={tag.value}
                    tag={{ id: tag.id, value: tag.value, title: tag.title }}
                />
            )}
        </div>

    );
}

export default TagList;
