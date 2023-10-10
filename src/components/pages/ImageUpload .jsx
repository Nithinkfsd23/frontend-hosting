import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/helper';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageData = reader.result; // This will be the Base64 data
        setSelectedImage(imageData);

        // Create a FormData object and append the selected image file
        const formData = new FormData();
        formData.append('image', file);

        // Axios POST request to upload the image
        axios
          .post(`${BASE_URL}/api/upload-image`, formData)
          .then((response) => {
            console.log(response.data); // Handle the server response as needed
          })
          .catch((error) => {
            console.error('Image upload failed:', error);
          });
      };
    }
  };

  return (
    <div>
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}

export default ImageUpload;
