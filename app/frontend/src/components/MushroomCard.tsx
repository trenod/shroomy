import { mergeStyles, ShimmerElementType } from "@fluentui/react";
import React from "react";
import styled from "styled-components";
import { getImageUrlsFromMushroom } from "../api/helperFunctions";
import { FALLBACK_MUSHROOM_IMAGE_URL, IMusroom } from "../api/interfaces";
import { hexToRgba, palette } from "../palette";
import { nsnf_norm_icon } from "./nsnf_norm_enum_to_icon";
import { StyledPredictionMushroomImg } from "./StyledPredictionMushroomImg";

interface MushroomProps {
  mushroom: IMusroom | null;
}

const MushroomCard: React.FC<MushroomProps> = ({ mushroom }) => {
  let recipeComponent = null;

  if (mushroom && mushroom.recipe && mushroom.recipe.includes("!!")) {
    const [header, recipe] = mushroom?.recipe.split("!!");
    recipeComponent = (
      <p>
        <strong>{header}</strong> {recipe}
      </p>
    );
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        {mushroom?.name || "Laster..."}{" "}
        {mushroom && nsnf_norm_icon(mushroom?.nsnf_norm as any)}
      </StyledHeader>
      <StyledPredictionMushroomImg
        src={
          (mushroom && getImageUrlsFromMushroom(mushroom)[0]) ||
          FALLBACK_MUSHROOM_IMAGE_URL
        }
        alt={mushroom?.name || "Mushroom"}
      />
      {mushroom && (
        <>
          <p>
            <strong>Vitenskapelig navn:</strong> {mushroom.s_name}
          </p>
          <p>
            <strong>Spiselighet(nsnf):</strong> {mushroom.nsnf_norm}
          </p>
          {mushroom.comment && (
            <p>
              <strong>Kommentar:</strong> {mushroom.comment}
            </p>
          )}
          <p>
            <strong>Beskrivelse:</strong> {mushroom.description}
          </p>
          {recipeComponent}
        </>
      )}
    </StyledWrapper>
  );
};

export default MushroomCard;

const shimmerWithElementFirstRow = [
  { type: ShimmerElementType.line, width: "100%", height: 16 },
];

export const StyledHeader = styled.div`
  font-size: 28px;
  font-weight: 600;
  display: flex;
  justify-contents: center;
  align-items: center;
  color: ${palette.brownDark};
  text-shadow: 1px 1px 1px ${palette.brownDarker};
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid ${hexToRgba(palette.brown, 0.3)};
  box-shadow: 0 0 3px ${hexToRgba(palette.lightOrange, 0.3)};
  background-color: ${palette.lighterOrange};
  max-width: 450px;
`;

export const StyledIconImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

export const StyledMushroomImg = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid black;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.025);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
  }
`;

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
    },
  },
});
