import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './app.css'
import ImgForm from './componets/ImgForm';

function App() {

    const apiUrl = "http://127.0.0.1:8000/api/photos/"
    const [photos, setPhotos] = useState()
    const [isLoading, setIsLoading] = useState(true)
    // Список тегов
    const [list, setList] = useState([
        'Abdomen',
        'Dorsum',
        'Head',
        'Inguinal region',
        'Lover limb',
        'Neck area',
        'Pelvis',
        'Thorax',
        'Throat',
        'Undefined',
        'Upper limb'
    ]);

    useEffect(() => {
        fechPhotos()
    }, [])

    //Получение фото без тега
    async function fechPhotos() {
        setIsLoading(true)
        const response = await axios({
            method: "GET",
            url: apiUrl
        }).then(r => r.data.filter(t => t.tag === ""))
        setPhotos(response)
        console.log('LOADED')
        setIsLoading(false)
    }
    //Отправка фото
    async function patchPhoto(photo) {
        await axios({
            method: "PATCH",
            url: apiUrl + photo.id,
            data: {
                tag: photo.tag
            },
        })
        console.log('UPLOADED')
    }

    // Добавление тега
    const addTag = (newTag) => {
        let oldTag = photos[0].tag
        photos[0].tag = newTag
        if (oldTag) setList([...list, oldTag].filter(t => t !== newTag).sort((a, b) => a > b ? 1 : -1))
        else setList(list.filter(t => t !== newTag))
    };

    // Удаление тега
    const removeTag = (tag) => {
        if (tag !== 'Missed') {
            setList([...list, tag].sort((a, b) => a.value > b.value ? 1 : -1))
            photos[0].tag = ""
        }
    };

    return (
        <div className="App">
            {isLoading
                ? <p>Loading</p>
                : <ImgForm
                    photos={photos}
                    options={list}
                    remove={removeTag}
                    add={addTag}
                    patchPhoto={patchPhoto}
                    setPhotos={setPhotos}
                    fetchPhoto={fechPhotos}
                />
            }
        </div>
    );
};

export default App;
