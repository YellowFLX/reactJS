import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'
import ImgForm from './componets/ImgForm';

function App() {
    const apiBaseUrl = "/api"
    const imagesUrl = "/photo"
    const [photos, setPhotos] = useState()
    const [tags, setTags] = useState([''])
    const [imagePhoto, setImagePhoto] = useState()
    const [diseaseTitle, setDiseaseTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const targetTag = ""

    useEffect(() => {
        fetchPhotos()
        fetchTags()
    }, [])

    // Получение фото без тега
    async function fetchPhotos() {
        setIsLoading(true)
        const response = await axios({
            method: "GET",
            url: `${apiBaseUrl}/photo/`,
            auth: {
                username: "tester",
                password: "test123"
            }
        }).then(r => r.data.filter(t => t.tag === targetTag))
        setPhotos(response)
        console.log('LOADED')
        setIsLoading(false)
    }

    // Получение списка тегов
    async function fetchTags() {
        const response = await axios({
            method: "GET",
            url: `${apiBaseUrl}/organ/`,
            auth: {
                username: "tester",
                password: "test123"
            }
        }).then(r => r.data.map(a => a.position))
        setTags([...new Set(response)].filter(t => t !== "").sort((a, b) => a > b ? 1 : -1))
    }

    // Отправка измененного тега фото
    async function patchPhoto(photo) {
        await axios({
            method: "PUT",
            url: `${apiBaseUrl}/photo/update`,
            data: {
                photoId: photo.photo,
                tag: photo.tag
            },
            auth: {
                username: "tester",
                password: "test123"
            }
        })
        console.log('UPLOADED')
    }

    // Получение фото
    async function fetchImage(photoId) {
        setImagePhoto('')
        const response = await axios({
            method: "GET",
            url: `${imagesUrl}/${photoId}`,
            auth: {
                username: "tester",
                password: "test123"
            },
            responseType: 'arraybuffer'
        })
            .then(r => ("data:image/png;base64," + Buffer.from(r.data, 'binary').toString('base64')))
        setImagePhoto(response)
        console.log('PH')
    }

    async function fetchDiseaseTitle(diseaseId) {
        const response = await axios({
            method: "GET",
            url: `${apiBaseUrl}/disease/${diseaseId}`,
            auth: {
                username: "tester",
                password: "test123"
            }
        }).then(r => r.data.title)
        setDiseaseTitle(response)
        console.log('LOADED')
    }

    // Добавление тега
    const addTag = (newTag) => {
        let oldTag = photos[0].tag
        photos[0].tag = newTag
        if (oldTag) setTags([...tags, oldTag].filter(t => t !== newTag).sort((a, b) => a > b ? 1 : -1))
        else setTags(tags.filter(t => t !== newTag).sort((a, b) => a > b ? 1 : -1))
        document.getElementById('010').selected = true
    };

    // Удаление тега
    const removeTag = (tag) => {
        if (tag !== 'Missed' && !(tags.includes(tag)) && tag !== '') {
            setTags([...tags, tag].sort((a, b) => a > b ? 1 : -1))
            photos[0].tag = ""
        }
    };

    return (
        <div className="App">
            {isLoading
                ? <p>Loading</p>
                : <ImgForm
                    photos={photos}
                    options={tags}
                    remove={removeTag}
                    add={addTag}
                    setPhotos={setPhotos}
                    patchPhoto={patchPhoto}
                    fetchPhotos={fetchPhotos}
                    diseaseTitle={diseaseTitle}
                    fetchDiseaseTitle={fetchDiseaseTitle}
                    fetchImage={fetchImage}
                    imagePhoto={imagePhoto}
                    isImageLoading={isImageLoading}
                    setIsImageLoading={setIsImageLoading}
                />
            }
        </div>
    );
};

export default App;
