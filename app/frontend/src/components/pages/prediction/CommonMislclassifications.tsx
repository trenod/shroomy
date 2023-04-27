import React, { useState } from "react";
import styled from "styled-components";
import { FALLBACK_MUSHROOM_IMAGE_URL, IMusroom } from "../../../api/interfaces";
import {
  getImageUrlsFromMushroom,
  getListMislabelFromMushroom,
} from "../../../api/helperFunctions";
import { hexToRgba, palette } from "../../../palette";
import { useNavigate } from "react-router-dom";

interface MushroomProps {
  mushroom: IMusroom;
}

const CommonMislabelsComponent: React.FC<MushroomProps> = ({ mushroom }) => {
  let mislabels = getListMislabelFromMushroom(mushroom);
  let noMislabels = mislabels.length == 0;

  const navigate = useNavigate();

  const handleClick = (name: string) => {
    const ressy = JSON.stringify(name);
    navigate(`/search?name=${name}`);
  };

  if (noMislabels) return null;
  return (
    <div style={{ marginLeft: "14px" }}>
      <StyledHeader>{"Ofte feilidentifisert som:"}</StyledHeader>
      {!noMislabels &&
        mislabels.map((mislabel, index) => {
          return (
            <StyledLabelWrapper
              key={index + "mislabel"}
              onClick={() => handleClick(mislabel.name)}
            >
              <StyledMushroomImg
                src={
                  (mislabel && mislabel.image_urls[0]) ||
                  FALLBACK_MUSHROOM_IMAGE_URL
                }
                alt={mislabel?.name}
              />
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: "18px", opacity: 0.9 }}
                >
                  {mislabel.name}
                </div>
                <div style={{ fontStyle: "italic" }}>{mislabel.s_name}</div>
              </div>
            </StyledLabelWrapper>
          );
        })}
    </div>
  );
};

export default CommonMislabelsComponent;

const StyledHeader = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

const StyledLabelWrapper = styled.div`
  display: flex;
  background-color: ${hexToRgba(palette.brownDarker, 0.1)};
  border: 1px solid ${hexToRgba(palette.primaryBlue, 0.5)};
  padding: 3px;
  border-radius: 3px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const StyledMushroomImg = styled.img`
  width: 70px;
  height: auto;
  max-height: 70px;
  min-height: 70px;

  border: 1px solid black;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
