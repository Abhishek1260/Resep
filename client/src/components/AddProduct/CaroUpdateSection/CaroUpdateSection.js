import React, { useState } from "react";
import './CaroUpdateSection.css'

function CaroUpdateSection(props) {

    const [previewSource, setpreviewSource] = useState()

    const previewFileSource = (file) => {
      const uploadReader = new FileReader();
      uploadReader.readAsDataURL(file);
      uploadReader.onloadend = () => {
        setpreviewSource(uploadReader.result);
        props.product.push(uploadReader.result)
      };
    };

    const changeHandler = (e) => {
      console.log('check')
      const files = e.target.files[0];
      console.log(files)
      previewFileSource(files)
    };

  return (
    <div className = "CaroUpdateSection">
      <div className="mainPhotoAddProduct">
        <label htmlFor = {`Photo${props.id}`} className="MainPhotoLabel">
          {previewSource ? (
            <img src={previewSource} alt="change" className="MainPhotoImage" />
          ) : (
            "+"
          )}
        </label>
        <input
          type="file"
          name="mainPhoto"
          id = {`Photo${props.id}`}
          onChange={changeHandler}
          className = "MainPhotoInput"
        />
      </div>
    </div>
  );
}

export default CaroUpdateSection;
