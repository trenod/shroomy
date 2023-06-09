export interface IMusroom {
  id: number;
  name: string;
  s_name: string;
  nsnf_norm: NSNF_NORM;
  comment: string;
  description: string;
  recipe: any;
  image_urls: string; //Is a weird string format, use getImageUrlsFromMushroom to get the correct format;
  list_mislabel: string; //Is IMusroomBasic[] in a weird string format, use getListMislabelFromMushroom to get the correct format;
}
export interface IMusroomBasic {
  //id: number; This should be implemented in the future
  name: string;
  s_name: string;
  image_urls: string[];
}

export interface IPrediction {
  name: string;
  predicted_id: null | number;
  predicted_name: string;
  probability: number; //Number between 0 and 1
}

export interface IPredictionIcludingFallbackId {
  name: string;
  predicted_id: number; //If the prediction is not found in the database, this will be the id of the fallback mushroom: -1
  predicted_name: string;
  probability: number; //Number between 0 and 1
}

export enum NSNF_NORM {
  giftig = "Giftig",
  ikke_matsopp = "Ikke matsopp",
  meget_giftig = "Meget giftig",
  spiselig = "Spiselig",
  spiselig_etter_avkoking = "Spiselig etter avkoking",
  spiselig_med_merknad = "Spiselig med merknad",
}

export const FALLBACK_MUSHROOM_IMAGE_URL = "/matblekksopp.png";
