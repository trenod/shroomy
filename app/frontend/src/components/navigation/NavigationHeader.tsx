import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledBackground } from "../../App";
import { SMALL_SCREEN_WIDTH } from "../../constants";
import { palette } from "../../palette";

const NavigationHeader: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <StyledNavbar expand={expand}>
      <StyledBackground />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "auto",
          }}
        >
          <Link to="/">
            <StyledShroomyImage
              src={`/chantarell-icon.png`} //matblekksopp.png`}
              alt={"Shroomy"}
            />
          </Link>
          <Link to="/">
            <StyledFontWrapper>
              <h1 className="l1">{"Shroomy"}</h1>
              <h1 className="l2">{"Shroomy"}</h1>
              <h1 className="l3">{"Shroomy"}</h1>
              <h1 className="l4">{"Shroomy"}</h1>
              <h1 className="l5">{"Shroomy"}</h1>
              <h1 className="l6">{"Shroomy"}</h1>
            </StyledFontWrapper>
          </Link>
        </div>
        <StyledLinkWrapper className="linkWrapper">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/history">History</Link>
          {/*<Link to={DEBUG_predictionURLWithData}>Prediction_dev</Link>*/}
        </StyledLinkWrapper>
        <StyledLinkWrapperMobile className="linkWrapperMobile">
          <a id="burger" onClick={() => setExpand(!expand)}>
            ≡
          </a>
          <Link onClick={() => setExpand(!expand)} to="/">
            Hjem
          </Link>
          <Link onClick={() => setExpand(!expand)} to="/search">
            Søk
          </Link>
          <Link onClick={() => setExpand(!expand)} to="/history">
            Historikk
          </Link>
          {/*<Link
            onClick={() => setExpand(!expand)}
            to={DEBUG_predictionURLWithData}
          >
            Prediction_dev
        </Link>*/}
        </StyledLinkWrapperMobile>
      </div>
    </StyledNavbar>
  );
};

export default NavigationHeader;

const DEBUG_predictionURLWithData =
  "/prediction?prediction=[{%22predicted_id%22:8,%22predicted_name%22:%22Matblekksopp%22,%22name%22:%22Coprinus%20comatus%22,%22probability%22:0.38736066222190857},{%22predicted_id%22:32,%22predicted_name%22:%22Hvit%20fluesopp%22,%22name%22:%22Amanita%20virosa%22,%22probability%22:0.13905255496501923},{%22predicted_id%22:43,%22predicted_name%22:%22Hare%C3%B8re%22,%22name%22:%22Otidea%20leporina%22,%22probability%22:0.10361220687627792},{%22predicted_id%22:30,%22predicted_name%22:%22Giftsjampinjong%22,%22name%22:%22Agaricus%20xanthodermus%22,%22probability%22:0.058202292770147324},{%22predicted_id%22:46,%22predicted_name%22:%22Svartskrubb%22,%22name%22:%22Leccinum%20variicolor%22,%22probability%22:0.03777172043919563}]";
const StyledNavbar = styled.nav<{ expand: boolean; hidden?: boolean }>`
  background-color: ${palette.primaryBlue};
  position: sticky;
  top: 0;
  z-index: 1000;

  .linkWrapper {
    display: none;
  }

  .linkWrapperMobile {
    display: flex;
    transition: max-height 0.3s ease-in-out;
    max-height: ${(props) => (props.expand ? "270px" : "75px")};
    overflow: hidden;

    #burger {
      margin-top: -25px
      font-family: "Comic Sans MS", "Comic Sans";
      font-weight: 800;
      font-size: 60px;
      transition: height 0.3s ease-in-out;
      height: ${(props) => (props.expand ? "51px" : "75px")};
      text-align: center;
    }
  }

  @media (min-width: ${SMALL_SCREEN_WIDTH}px) {
    .linkWrapper {
      display: block;
    }

    .linkWrapperMobile {
      display: none;
    }
  }
`;

const StyledFontWrapper = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }

  link {
    color: red;
    padding: 10px;
  }

  position: relative;
  margin-left: 8px;
  height: 75px;
  width: 100px;
  .l1 {
    position: absolute;
    top: 0;
    left: 0;
    color: ${palette.lighterOrange};
    z-index: 10;
  }
  .l2 {
    position: absolute;
    top: 2px;
    left: 2px;
    color: #ff000080;
    z-index: 9;
  }
  .l3 {
    position: absolute;
    top: 2px;
    left: 4px;
    color: green;
    z-index: 8;
  }

  .l4 {
    position: absolute;
    top: 6px;
    left: 6px;
    color: blue;
    z-index: 7;
  }
  .l5 {
    position: absolute;
    top: 8px;
    left: 8px;
    color: yellow;
    z-index: 6;
  }
  .l6 {
    position: absolute;
    top: 9px;
    left: 9px;
    color: pink;
    z-index: 5;
  }

  h1 {
    font-family: retro;
    font-size: 28px;

    transition: transform 0.3s ease-in-out;

    :hover {
      transform: scale(1.2) rotate(745deg);
      cursor: pointer;
    }
  }
`;

const StyledLinkWrapper = styled.div`
  @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }

  a {
    font-family: retro;
    color: #ffffffee;
    padding: 10px;
    font-size: 18px;
    text-shadow: -1px -1px 0 ${palette.primaryBlue},
      1px -1px 0 ${palette.primaryBlue}, -1px 1px 0 ${palette.primaryBlue},
      1px 1px 0 ${palette.primaryBlue};
    transition: font-size 0.25s ease-in-out, color 0.25s ease-in-out;

    :hover {
      color: #ffffffff;
      cursor: pointer;
    }
  }
`;

const StyledLinkWrapperMobile = styled.div`
  flex-direction: column;
  float: right;
  padding-top: @font-face {
    font-family: retro;
    src: url(retroFont.ttf);
  }

  a {
    font-family: retro;
    color: #ffffffee;
    padding: 10px;
    font-size: 25px;
    text-shadow: -1px -1px 0 ${palette.primaryBlue},
      1px -1px 0 ${palette.primaryBlue}, -1px 1px 0 ${palette.primaryBlue},
      1px 1px 0 ${palette.primaryBlue};
    transition: font-size 0.25s ease-in-out, color 0.25s ease-in-out;

    :hover {
      color: #ffffffff;
      cursor: pointer;
    }
  }
`;

const StyledShroomyImage = styled.img`
  height: 60px;
  width: auto;
  border-radius: 50%;
  margin-left: 18px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease-in-out;

  :hover {
    transform: scale(1.2) rotate(745deg);
    box-shadow: 0 0 15px rgba(0, 100, 100, 0.5);
    cursor: pointer;
  }
`;
