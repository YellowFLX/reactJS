import React, { useEffect } from 'react'
import Selection from './Selection';
import TagItem from './TagItem';

const ImgForm = ({ photos, options, add, remove, patchPhoto, setPhotos, imagePhoto, fetchImage, fetchPhotos}) => {
    useEffect(() => {
        if (photos.length)fetchImage(photo.photo)  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photos[0]])

    if (photos.length === 0) {
        return (
            <div className="photo">
                <p>Photos without a tag not found</p>
                <button className="btn" onClick={fetchPhotos}>Reload</button>
            </div>
        )
    }

    let photo = photos[0]
    console.log(photos[0])
    
    return (
        <div className="ImgForm">
            <img src={imagePhoto} alt="" />
            <p>{photo.photo}</p>
            <TagItem
                tag={photo.tag}
                remove={remove}
            />
            <Selection
                add={add}
                options={options}
            />
            <button
                className="btn"
                onClick={() => {
                    patchPhoto(photos[0])
                    remove(photo.tag)
                    setPhotos(photos.slice(1))
                }}
            >Save</button>
        </div>
    );
}

export default ImgForm;
