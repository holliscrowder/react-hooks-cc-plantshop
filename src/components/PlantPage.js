import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch("http://localhost:6001/plants");
      const plantData = await response.json();
      setPlants(plantData);
    };
    fetchPlants();
  }, []);

  function onAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={plants} search={search} />
    </main>
  );
}

export default PlantPage;
