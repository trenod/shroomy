import {
  FALLBACK_MUSHROOM_IMAGE_URL,
  IMusroom,
  IMusroomBasic,
} from "./interfaces";

export const getImageUrlsFromMushroom = (mushroom: IMusroom): string[] => {
  try {
    let urls = JSON.parse(mushroom.image_urls.replace(/'/g, '"'));
    if (urls.length == 0) {
      return [FALLBACK_MUSHROOM_IMAGE_URL];
    }
    return urls;
  } catch {
    return [FALLBACK_MUSHROOM_IMAGE_URL];
  }
};

const parseOrderedDictString = (str: string) => {
  const validJson = str
    .replace(/OrderedDict\(\[(.*?)\]\)/g, "{$1}")
    .replace(/\(/g, "[")
    .replace(/\)/g, "]")
    .replace(/'/g, '"');

  return JSON.parse(validJson);
};

export const getListMislabelFromMushroom = (mushroom: IMusroom) => {
  const input = parseOrderedDictString(mushroom.list_mislabel);
  const jsObjects: IMusroomBasic[] = input.map((item: any) => {
    const obj: { [x: string]: any } = {};
    for (const [key, value] of Object.entries(item)) {
      obj[key] = value;
    }
    return obj;
  });
  return jsObjects;
};
