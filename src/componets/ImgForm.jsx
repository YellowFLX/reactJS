import React from 'react'
import Selection from './Selection';
import TagItem from './TagItem';

const ImgForm = ({ photos, options, add, remove, patchPhoto, setPhotos, fetchPhoto }) => {
    if (photos.length === 0) {
        return (
            <div className="photo">
                <p>Photos without a tag not found</p>
                <button className="btn" onClick={fetchPhoto}>Reload</button>
            </div>

        )
    }

    let photo = photos[0]
    let photoURL = "https://via.placeholder.com/600/" + photo.photo.slice(0, 6)

    return (
        <div className="ImgForm">
            <img src={photoURL} alt="" />
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
