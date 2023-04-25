import styled from "styled-components";
import { IMusroom } from "../../../api/interfaces";
import { mushroomAPI } from "../../../api/mushroomAPI";
import MushroomCard from "../../MushroomCard";
import React, { useState, useEffect, useRef } from "react";
import NoMushroomsFound from "./NoResultsFallback";
import { fallback_loading } from "../../MushroomPredictionCard";

const DEBOUNCE_DELAY = 500; // Adjust the debounce delay as needed
const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [mushrooms, setMushrooms] = useState<IMusroom[]>([
    fallback_loading,
    fallback_loading,
    fallback_loading,
  ]);
  const searchTimer = useRef<number | null>(null);

  const handleSearch = async (searchText: string) => {
    const results = await mushroomAPI.getMushroomsByName(searchText);
    setMushrooms(results);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    console.log("new value: ", event.target.value, "searchText: ", searchText);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = window.setTimeout(() => {
      handleSearch(event.target.value);
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);
  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <Container>
      <StyledInput
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search for mushrooms"
      />
      <StyledResultText>{`${mushrooms.length + ""} result${
        mushrooms.length == 1 ? " " : "s "
      }${!!searchText ? `for \"${searchText}\"` : ""}`}</StyledResultText>
      <CardsWrapper>
        {mushrooms
          ? mushrooms.map((mushroom, idx) => (
              <MushroomCard mushroom={mushroom} key={`mc_${idx}`} />
            ))
          : ""}
      </CardsWrapper>
      <hr></hr>
      {mushrooms.length === 0 && <NoMushroomsFound />}
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CardsWrapper = styled.div``;

const StyledInput = styled.input`
  width: 100%;
  margin: 5px;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 4px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0077b6;
  }
`;
const StyledResultText = styled.div`
  margin: 5px;
  color: #0077b6;
  text-align: center;
  font-size: 18px;
`;
