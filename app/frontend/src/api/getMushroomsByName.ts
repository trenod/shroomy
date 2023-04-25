import { mushroomFetch } from "./apicontext";
import { IMusroom } from "./interfaces";

const endpoint = "mushrooms";

//Stringmatches on common name in database
export const getMushroomsByName: (
  searchString: string
) => Promise<IMusroom[]> = async (searchString) =>
  await mushroomFetch({
    endpoint: endpoint + "/search",
    qs: { name: searchString },
  });
