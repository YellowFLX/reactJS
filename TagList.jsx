import React from 'react'
import TagItem from './src/componets/Tags/TagItem';
import './tags.css'

const TagList = ({ tags, remove }) => {

    return (
        <div className="taglist">
            
                <TagItem
                    remove={remove}
                    key={tags.value}
                    tags={{ id: tags.id, value: tags.value }}
                />
            
        </div>

    );
}

export default TagList;
