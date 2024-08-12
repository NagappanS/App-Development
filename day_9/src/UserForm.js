import React, { useState, useEffect } from 'react';
import './userform.css';
import logo from './images/Blogo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    birthdayboyorgirl: '',
    birthdate: '', // This will be in 'YYYY-MM-DD' format
    age: '',
    user4: { id: user ? user.id : '' }
  });

  const [cakeOrders, setCakeOrders] = useState([]);
  const [selectedDecorables, setSelectedDecorables] = useState([]);
  const [ecoPlans, setEcoPlans] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        user4: { id: user.id }
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesRes = await fetch('http://localhost:8081/orders');
        const cakesData = await cakesRes.json();
        setCakeOrders(cakesData);

        const decorablesRes = await fetch('http://localhost:8081/selectedItems');
        const decorablesData = await decorablesRes.json();
        setSelectedDecorables(decorablesData);

        const ecoPlansRes = await fetch('http://localhost:8081/cart');
        const ecoPlansData = await ecoPlansRes.json();
        setEcoPlans(ecoPlansData);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!user) {
      toast.error('Please log in to send a request.');
      return;
    }

    if (formData.email !== user.email) {
      toast.error('The email entered does not match the logged-in user\'s email.');
      return;
    }

    if (cakeOrders.length === 0 && selectedDecorables.length === 0 && ecoPlans.length === 0) {
      toast.error('Please select at least one cake, decorable, or eco plan.');
      return;
    }

    // Format the birthdate to 'YYYY-MM-DD'
    const formattedBirthdate = new Date(formData.birthdate).toISOString().split('T')[0];
    
    try {
      await fetch('http://localhost:8081/pendingRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          birthdate: formattedBirthdate, // Use the formatted birthdate
          cakeOrders,
          selectedDecorables,
          ecoPlans
        }),
      });
      toast.success('Request sent successfully! You will get an mail or call for Confirmation ');
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        birthdayboyorgirl: '',
        birthdate: '',
        age: '',
        user4: { id: user ? user.id : '' }
      });
      setCakeOrders([]);
      setSelectedDecorables([]);
      setEcoPlans([]);
    } catch (error) {
      toast.error('Error sending request. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/event');
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Born Eves User Form</h1>
      </div>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          UserName:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          BirthDay Boy or Girl Name:
          <input
            type="text"
            name="birthdayboyorgirl"
            value={formData.birthdayboyorgirl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="send-button">SEND REQUEST</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
