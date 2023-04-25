import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IPredictionHistoryEntry,
  getSavedPredictoins,
} from "./localstorageHelper";

const HistoryPage: React.FC = () => {
  const [predictionHistory, setPredictionHistory] = useState<
    IPredictionHistoryEntry[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = getSavedPredictoins();
    setPredictionHistory(history.reverse());
  }, []);

  const handleClick = (prediction: IPredictionHistoryEntry) => {
    const ressy = JSON.stringify(prediction);
    navigate(`/prediction?prediction=${ressy}`);
  };

  return (
    <Container>
      {predictionHistory.map((p, i) => {
        return (
          <ResulstWrapper onClick={() => handleClick(p.response)}>
            <StyledResultText>{moment(p.time).format("LLL")}</StyledResultText>
            <StyledResultText>{p.name}</StyledResultText>
          </ResulstWrapper>
        );
      })}
      {predictionHistory.length == 0 && (
        <StyledResultTextFallback>
          {"No predictions have been saved"}
        </StyledResultTextFallback>
      )}
    </Container>
  );
};

export default HistoryPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledResultText = styled.div`
  margin: 5px;
  color: #0077b6;
  text-align: center;
  font-size: 18px;
`;

const ResulstWrapper = styled.div`
  margin: 5px;
  padding: 15px;
  border-radius: 5px;
  border: 2px solid #0077b6;
  background-color: white;
  text-align: center;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledResultTextFallback = styled.div`
  margin: 5px;
  padding: 15px;
  border-radius: 5px;
  border-color: #0077b6;
  color: #0077b6;
  background-color: white;
  text-align: center;
  font-size: 18px;
`;
