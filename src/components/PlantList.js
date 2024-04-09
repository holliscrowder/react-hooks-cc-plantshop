import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants, search }) {
  function onDeletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPlants(
            plants.filter((plant) => {
              return plant.id !== id;
            })
          );
        }
      })
      .catch((error) => console.error(error));
  }

  function onUpdatePrice(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlants);
  }

  const plantList = plants
    .filter((plant) => {
      return plant.name.toLowerCase().includes(search.toLowerCase());
    })
    .map(({ id, name, image, price }) => {
      return (
        <PlantCard
          key={id}
          id={id}
          name={name}
          image={image}
          price={price}
          onDeletePlant={() => {
            onDeletePlant(id);
          }}
          onUpdatePrice={onUpdatePrice}
        />
      );
    });

  return <ul className="cards">{plantList}</ul>;
}

export default PlantList;
