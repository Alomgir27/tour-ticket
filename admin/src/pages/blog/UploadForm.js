import React, { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    tag: '',
    short_desc: '',
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('details', formData.details);
    data.append('tag', formData.tag);
    data.append('short_desc', formData.short_desc);
    data.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: data,
      });
      
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
      <input type="text" name="details" value={formData.details} onChange={handleInputChange} placeholder="Details" required />
      <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} placeholder="Tag" required />
      <input type="text" name="short_desc" value={formData.short_desc} onChange={handleInputChange} placeholder="Short Description" required />
      <input type="file" onChange={handleFileChange} accept="image/*" required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
