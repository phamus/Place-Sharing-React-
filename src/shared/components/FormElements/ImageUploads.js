import React, { useRef } from "react";

import "./ImageUploads.js";
import Button from "./Button";

const ImageUploads = () => {
  const filePickerRef = useRef();

  const pickedHandler = () => {
    console.log(event.target);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        type="file"
        style={{ display: none }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && center}`}>
        <div className="image-upload__preview">
          <img src="" alt="preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUploads;
