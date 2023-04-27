import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getImageUrlsFromMushroom } from "../../../api/helperFunctions";
import {
  FALLBACK_MUSHROOM_IMAGE_URL,
  IMusroom,
  IPrediction,
} from "../../../api/interfaces";
import { mushroomAPI } from "../../../api/mushroomAPI";
import { debugMushroom } from "../../../constants";
import { hexToRgba, palette } from "../../../palette";
import { StyledPredictionMushroomImg } from "../../StyledPredictionMushroomImg";
import { StyledHeader } from "../../MushroomCard";
import CommonMislabelsComponent from "./CommonMislclassifications";

interface MushroomPredictionProps {
  predictions: IPrediction[];
}

const MushroomPredictionSummaryNew: React.FC<MushroomPredictionProps> = ({
  predictions,
}) => {
  //const [expandData, setExpandData] = useState<boolean>(false);
  const [mushroom, setMushroom] = useState<IMusroom | null>(null);
  const [currentImage, setCurrentImage] = useState<string>(
    FALLBACK_MUSHROOM_IMAGE_URL
  );
  const [images, setImages] = useState<string[]>([
    FALLBACK_MUSHROOM_IMAGE_URL,
    FALLBACK_MUSHROOM_IMAGE_URL,
    FALLBACK_MUSHROOM_IMAGE_URL,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (predictions[0].predicted_id !== null) {
        const data = await mushroomAPI.getMushroomsById(
          predictions[0].predicted_id
        );
        const images = getImageUrlsFromMushroom(data);
        setMushroom(data);
        setImages(images);
        setCurrentImage(images[0]);
      } else {
        setMushroom(debugMushroom);
      }
    };
    fetchData();
  }, []);

  const predStrFromPred = (pred: IPrediction) => {
    return Number(pred.probability * 100).toFixed(2);
  };

  const SummaryObject = (obj: { prediction: IPrediction }) => {
    const mushroom = obj.prediction;
    const predStr = predStrFromPred(obj.prediction);
    const name =
      !!mushroom && !mushroom.name.includes("nes ikke i databasen") ? (
        <span>{mushroom.predicted_name}</span>
      ) : (
        <span style={{ fontStyle: "italic" }}>{obj.prediction.name}</span>
      );
    const pred = (
      <span style={{ float: "right", paddingLeft: "5px" }}>{predStr}%</span>
    );

    return (
      <div>
        <div key={"prediction" + predStr}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: "10px",
                width: "100%",
                zIndex: 10,
                fontSize: "1.2em",
                fontFamily: "Arial",
              }}
            >
              {name}
              {pred}
            </div>
            <div
              style={{
                backgroundColor: `${palette.primaryBlue}80`,
                position: "absolute",
                height: "30px",
                zIndex: 9,
                width: `${(obj.prediction.probability * 100 + 3) * 0.82}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <StyledPredictionWrapper>
        <div>
          <StyledHeader>
            {mushroom?.name || "Laster..."}{" "}
            <span style={{ paddingLeft: "10px" }}>
              {predStrFromPred(predictions[0])}
            </span>
            {`%`}
          </StyledHeader>
          <StyledPredictionMushroomImg
            src={currentImage}
            alt={mushroom?.name || "Mushroom"}
          />
          <div style={{ display: "flex" }}>
            {images.map((i, index) => {
              return (
                <StyledPredictionMushroomImgSmall
                  onClick={() => setCurrentImage(i)}
                  focused={i == currentImage}
                  key={index}
                  src={i}
                />
              );
            })}
          </div>
        </div>
        <div style={{ width: "300", height: "250px", position: "relative" }}>
          <div
            style={{ fontSize: "23px", fontWeight: 700, marginLeft: "14px" }}
          >
            {"Prediksjoner"}
          </div>
          {predictions.map((p: any, index) => {
            return <SummaryObject key={"psum" + index} prediction={p} />;
          })}
        </div>
        {mushroom && <CommonMislabelsComponent mushroom={mushroom} />}
      </StyledPredictionWrapper>
    </div>
  );
};

export default MushroomPredictionSummaryNew;

export const StyledChart = styled.img`
  height: 80px;
  width: 80px;
  position: fixed;
  top: 120px;
  left: 20px;

  transition: transform 0.25s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.2);
  }
`;

export const StyledPredictionMushroomImgSmall = styled.img<{
  focused: boolean;
}>`
  width: auto;
  max-width: 80px;
  height: 80px;
  border: 1px solid black;
  border-radius: 3px;
  margin: 5px;
  opacity: ${(props) => (props.focused ? "0.7" : "1")};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.01);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
  }
`;

export const StyledPredictionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 15px 15px 15px;
  border-radius: 4px;
  border: 1px solid ${hexToRgba(palette.brown, 0.3)};
  box-shadow: 0 0 3px ${hexToRgba(palette.lightOrange, 0.3)};
  background-color: ${palette.lighterOrange};
`;
