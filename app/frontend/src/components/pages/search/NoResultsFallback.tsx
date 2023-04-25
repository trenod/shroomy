import React from "react";
import styled from "styled-components";

const StyledNoMushrooms = styled.div`
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffcc00;
  font-size: 24px;
  font-weight: bold;
  color: #222;
  text-shadow: 1px 1px #ff9933, 2px 2px #ff9933, 3px 3px #ff9933;
  width: 100%;
  max-width: 400px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const NoMushroomsFound: React.FC = () => {
  return <StyledNoMushrooms>No mushrooms found</StyledNoMushrooms>;
};

export default NoMushroomsFound;
