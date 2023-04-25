import { getMushrooms } from "./getMushrooms";
import { getMushroomsById } from "./getMushroomsById";
import { getPredictionFromImage } from "./getPredictionFromImage";
import { _DEBUG_getPredictionFromImage } from "./_DEBUG_getPredictionFromImage";
import { getMushroomsByName } from "./getMushroomsByName";

export const mushroomAPI = {
  getMushrooms,
  getMushroomsById,
  getMushroomsByName,
  getPredictionFromImage,
  _DEBUG_getPredictionFromImage,
};
