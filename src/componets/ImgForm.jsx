import React from 'react'
import Selection from './Selection';
import TagItem from './Tags/TagItem';

const ImgForm = ({photos, options, add, remove, patchPhoto, setPhotos}) => {
    if (photos.length === 0) {
        return (
            <div className="photo">
                фото не найдены
            </div>
        )
    }
    let photo = photos[0]
    let photoURL = "https://via.placeholder.com/600/" + photo.photo.slice(0,6)
    return (
        <div>
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
                className="uploadbtn"
                onClick={() => {
                    patchPhoto(photos[0])
                    remove(photo.tag)
                    setPhotos(photos.slice(1))
                }
            }
            >Save</button>
        </div>
        

    );
}

export default ImgForm;
