import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, search }) {
  const plantList = plants
    .filter((plant) => {
      return plant.name.toLowerCase().includes(search.toLowerCase());
    })
    .map(({ id, name, image, price }) => {
      return <PlantCard key={id} name={name} image={image} price={price} />;
    });

  return <ul className="cards">{plantList}</ul>;
}

export default PlantList;
