import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IMusroom, IPrediction } from "../../../api/interfaces";
import { mushroomAPI } from "../../../api/mushroomAPI";
import { debugMushroom } from "../../../constants";
import { palette } from "../../../palette";
import {
  StyledWrapper,
  StyledHeader,
  StyledIconImg,
  StyledMushroomImg,
} from "../../MushroomCard";

interface MushroomPredictionProps {
  predictions: IPrediction[];
}

const MushroomPredictionSummaryNew: React.FC<MushroomPredictionProps> = ({
  predictions,
}) => {
  //const [expandData, setExpandData] = useState<boolean>(false);
  const [mushroom, setMushroom] = useState<IMusroom | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await mushroomAPI.getMushroomsById(5);
      setMushroom(debugMushroom);
    };
    fetchData();
  }, []);

  const SummaryObject = (obj: { prediction: IPrediction }) => {
    const mushroom = obj.prediction;
    const predStr = Number(obj.prediction.probability * 100).toFixed(3);
    const name =
      !!mushroom && !mushroom.name.includes("nes ikke i databasen") ? (
        <span>{mushroom.name}</span>
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
            <div style={{ marginRight: "10px", width: "100%", zIndex: 10 }}>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        top: "100px",
        left: 0,
      }}
    >
      <StyledWrapper>
        <div style={{ fontWeight: 700, fontSize: "20px" }}>
          {"Oppsummering:"}
        </div>
        {predictions.map((p: any, index) => {
          return <SummaryObject key={"psum" + index} prediction={p} />;
        })}
      </StyledWrapper>
    </div>
  );
};

export default MushroomPredictionSummaryNew;

//<StyledChart onClick={handleExpand} src="chart.png" />

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
