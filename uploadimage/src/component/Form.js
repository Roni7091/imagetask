import React, { useState } from 'react';
import '../component/form.css'; 

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Data sent successfully.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone No</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
       
       
<div>
  <label>Image</label>
  <img src={formData.image} alt="Uploaded Image" />
</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;


