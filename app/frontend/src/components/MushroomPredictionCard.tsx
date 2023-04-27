import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IMusroom,
  IPredictionIcludingFallbackId,
  NSNF_NORM,
} from "../api/interfaces";
import { mushroomAPI } from "../api/mushroomAPI";
import { palette } from "../palette";
import MushroomCard from "./MushroomCard";

interface MushroomPredictionProps {
  prediction: IPredictionIcludingFallbackId;
}

const MushroomPredictionCard: React.FC<MushroomPredictionProps> = ({
  prediction,
}) => {
  const [mushroom, setMushroom] = useState<IMusroom | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (prediction.predicted_id > 0) {
        const data = await mushroomAPI.getMushroomsById(
          prediction.predicted_id
        );
        setMushroom(data);
      } else {
        setMushroom(fallback_prediction);
      }
    };
    fetchData();
  }, []);

  const predStr = Number(prediction.probability * 100).toFixed(3);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StyledNameDiv>
        {prediction.name} <span>{predStr}</span>
        {`%`}
      </StyledNameDiv>
      <MushroomCard mushroom={mushroom} />
    </div>
  );
};

export default MushroomPredictionCard;

export const StyledNameDiv = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }
  font-family: retro;
  font-size: 30px;
  text-align: center;
  color: ${palette.brownDarker};

  span {
    font-family: "Comic Sans MS", "Comic Sans";
    font-weight: 800;
  }
`;
export const fallback_prediction: IMusroom = {
  nsnf_norm: NSNF_NORM.giftig,
  comment: "",
  recipe: null,
  image_urls: "['/matblekksopp.png']",
  list_mislabel: "[]",
  description: "Soppen finnes ikke i databasen",
  id: -1,
  s_name: "Soppenis Finnisikke",
  name: "Finnes ikke i databasen",
};

export const fallback_loading: IMusroom = {
  nsnf_norm: NSNF_NORM.giftig,
  comment: "",
  recipe: null,
  image_urls: "['/matblekksopp.png']",
  list_mislabel: "[]",
  description: "Loading information about mushroom...",
  id: -1,
  s_name: "Loading",
  name: "Loading...",
};
