import React, { useState } from 'react';
import Selection from './componets/Selection';
import TagList from './componets/Tags/TagList';
import './app.css'

function App() {

// Список добавленных тэгов
    const [tags, setTags] = useState([
        { id: 1, value: 'black', title: 'Black color' },
        { id: 2, value: 'white', title: 'White color' },
        { id: 3, value: 'orange', title: 'Orange color' },
        { id: 4, value: 'purple', title: 'Purple color' },
    ]);

// Списко не добавленных тэгов
    const [list, setList] = useState([
        { id: 5, value: 'red', title: 'Red color' },
        { id: 6, value: 'yellow', title: 'Yellow color' },
        { id: 7, value: 'green', title: 'Green color' },
        { id: 8, value: 'blue', title: 'Blue color' },
    ]);

// Добавление тэгов
    const addTag = (newTag) => {
        setTags([...tags, newTag].sort((a, b) => a.value > b.value ? 1 : -1))
        setList(list.filter(t => t.value !== newTag.value))
    };
// Удаление тегов
    const removeTag = (tag) => {
        setTags(tags.filter(t => t.value !== tag.value))
        setList([...list, tag].sort((a, b) => a.value > b.value ? 1 : -1))
    };


    return (
        <div className="App">
            <img src='https://via.placeholder.com/600/b0f7cc' alt='colors'></img>
        {/* Отображение добавленных тэгов */}
            <TagList
                remove={removeTag}
                tags={tags}
            />
        {/* Отображение выподающего списка не добавленных тэгов */}
            <Selection
                add={addTag}
                options={list}
            />
        </div>
    );
};

export default App;
