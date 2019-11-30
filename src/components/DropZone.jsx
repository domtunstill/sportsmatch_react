import React, { Component } from 'react';

class DropZone extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Dropzone">
        <img
          alt="upload"
          className="Icon"
          src="../test_images/911428568.jpg.0.jpg"
        />
      <span>Upload Image</span>
      </div>
    )
  }
}
export default DropZone
