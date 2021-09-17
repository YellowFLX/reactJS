import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './app.css'
import ImgForm from './componets/ImgForm';

function App() {

   
    const [photos, setPhotos] = useState()
    
    useEffect(()=>{
        fechPhotos()
    },[])


    async function fechPhotos() {
        setisLoading(true)
        const response = await axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/photos/"
        }).then(r => r.data.filter(t => t.tag === ""))
        setPhotos(response)
        console.log('LOADED')
        setisLoading(false)
    }

    async function patchPhoto(photo) {
        await axios({
            method: "PATCH",
            url: "http://127.0.0.1:8000/api/photos/"+photo.id,
            data: {
                tag: photo.tag
              },
        })
        console.log('UPLOADED')
    }
    
    const [isLoading, setisLoading] = useState(true)

    // Список не добавленных тэгов
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

    // Добавление тэга
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
                ? <p>Загрузка</p>
                : <ImgForm
                    photos={photos}
                    remove={removeTag}
                    add={addTag}
                    options={list}
                    patchPhoto={patchPhoto}
                    setPhotos={setPhotos}
                />
                
            }
        </div>
    );
};

export default App;
