import React, { useState } from "react";

function PlantCard({ id, name, image, price, onDeletePlant, onUpdatePrice }) {
  const [isInStock, setIsInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState();

  function toggleInStock() {
    setIsInStock(!isInStock);
  }

  function handlePriceChange(event) {
    setUpdatedPrice(event.target.value);
  }

  function handleNewPrice(event) {
    event.preventDefault();
    const priceData = { price: updatedPrice };
    const updatePrice = async () => {
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(priceData),
      });
      const updatedPlant = await response.json();
      onUpdatePrice(updatedPlant);
    };
    updatePrice();
    setUpdatedPrice("");
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={toggleInStock} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
      <p>
        <button onClick={onDeletePlant} className="delete">
          Delete
        </button>
      </p>
      <div>
        <form onSubmit={handleNewPrice} className="update-price">
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="New Price"
            value={updatedPrice}
            onChange={handlePriceChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </li>
  );
}

export default PlantCard;
