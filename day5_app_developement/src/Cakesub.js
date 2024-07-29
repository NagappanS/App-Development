import React, { useState } from 'react';
import './cakesub.css';
import CakeGrid from './CakeGrid';
import { Toolbar } from '@mui/material';

const cakes = [
  { id: 1, name: 'Chocolate Cake' },
  { id: 2, name: 'Vanilla Cake' },
  { id: 3, name: 'Red Velvet Cake' },
  { id: 4, name: 'Lemon Cake' },
  { id: 5, name: 'Carrot Cake' },
  { id: 6, name: 'Cheesecake' },
  { id: 7, name: 'Strawberry Cake' },
  { id: 8, name: 'Black Forest Cake' },
  { id: 9, name: 'Pineapple Cake' },
  { id: 10, name: 'Marble Cake' },
  { id: 11, name: 'Coconut Cake' },
  { id: 12, name: 'Pumpkin Cake' },
  { id: 13, name: 'Almond Cake' },
  { id: 14, name: 'Coffee Cake' },
  { id: 15, name: 'Banana Cake' },
  { id: 16, name: 'Blueberry Cake' },
  { id: 17, name: 'Mango Cake' },
  { id: 18, name: 'Butter Cake' },
  { id: 19, name: 'Orange Cake' },
  { id: 20, name: 'Peanut Butter Cake' },
  { id: 21, name: 'Mint Chocolate Cake' },
  { id: 22, name: 'Tiramisu Cake' },
  { id: 23, name: 'Matcha Cake' },
  { id: 24, name: 'Hazelnut Cake' },
  { id: 25, name: 'Funfetti Cake' },
  { id: 26, name: 'Lava Cake' },
  { id: 27, name: 'Zucchini Cake' },
  { id: 28, name: 'Pistachio Cake' },
];

function Cakesub() {
  const [quantities, setQuantities] = useState(cakes.map(() => 0));
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
    }
    setQuantities(newQuantities);
  };

  const handleOrderNow = () => {
    setOrderSuccess(true);
  };

  const closeOrderSuccess = () => {
    setOrderSuccess(false);
  };

  return (
    <>
    <Toolbar/>
    <div className="Appss">
      <header className="App-header">
        <h1>Cake Selection</h1>
        <h2>Make your day more sweet</h2>
      </header>
      <CakeGrid 
        quantities={quantities} 
        handleIncrement={handleIncrement} 
        handleDecrement={handleDecrement} 
      />
      <button className="order-button" onClick={handleOrderNow}>Order Now</button>
      {orderSuccess && (
        <div className="order-success">
          <button className="close-button" onClick={closeOrderSuccess}>x</button>
          <h3>Order Successful</h3>
          <ul>
            {cakes.map((cake, index) => (
              quantities[index] > 0 && (
                <li key={cake.id}>
                  {cake.name}: {quantities[index]} kg
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}

export default Cakesub;