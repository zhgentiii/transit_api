"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { CoordinateSelector } from "./components/CoordinateSelector/CoordinateSelector";
import { ExpressDeliveryOptions } from "./components/ExpressDeliveryOptions/ExpressDeliveryOptions";

export default function Home() {
  const [selectedFrom, setSelectedFrom] = useState({
    selectedFrom: "",
    id: null,
  });
  const [selectedTo, setSelectedTo] = useState({
    selectedTo: "",
    id: null,
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    getCityList().then((res) => {
      if (res) {
        setList(res);
      }
    });
  }, []);

  const getCityList = async () => {
    const res = await fetch("transit-hhbin4wlj-zhgentiiis-projects.vercel.app/api/coordinates", {
      method: "GET",
    });

    const repo = await res.json();
    return repo;
  };

  const handleFromChange = (e) => {
    const selectedCity = list.find((city) => city.Name === e.target.value);
    setSelectedFrom({
      selectedFrom: e.target.value,
      id: selectedCity?.id || null,
    });
  };

  const handleToChange = (e) => {
    const selectedCity = list.find((city) => city.Name === e.target.value);
    setSelectedTo({ selectedTo: e.target.value, id: selectedCity?.id || null });
  };

  return (
    <div className="w-full h-full">
      <Header />
      <CoordinateSelector
        handleFromChange={handleFromChange}
        handleToChange={handleToChange}
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
        list={list}
      />
      <ExpressDeliveryOptions />
    </div>
  );
}
