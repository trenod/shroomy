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
  if (str == "['']") return [];
  let objs: IMusroomBasic[] = [];

  let split = str.split("OrderedDict");
  split.map((od, index) => {
    if (index == 0) return null;
    let obj: IMusroomBasic = {
      name: "",
      s_name: "",
      image_urls: [],
    };

    const nameRegex = /'name', '(.+?)'/;
    const nameMacth = od.match(nameRegex);
    obj.name = nameMacth ? nameMacth[1] : "";

    const s_nameRegex = /'s_name', '(.+?)'/;
    const s_nameMacth = od.match(s_nameRegex);
    obj.s_name = s_nameMacth ? s_nameMacth[1] : "";

    const imageUrlRegex = /'image_url[s]', (\[.+?\])/;
    const imageUrlMacth = od.match(imageUrlRegex);
    let urls: string[] = [];

    try {
      let imgs = imageUrlMacth && imageUrlMacth[1].split(",");
      imgs &&
        imgs.map((img) =>
          urls.push(img.replace("[", "").replace("]", "").replaceAll("'", ""))
        );
      obj.image_urls = urls;
    } catch {
      console.warn(
        "couldn't parse image urls",
        imageUrlMacth && "[" + imageUrlMacth[1] + "]",
        imageUrlMacth && typeof imageUrlMacth[1]
      );
    }

    objs.push(obj);
  });
  return objs;
};

export const getListMislabelFromMushroom = (mushroom: IMusroom) => {
  const input = parseOrderedDictString(mushroom.list_mislabel);
  return input;
};
