export const mushroomServerURL = "http://13.50.15.63:8000";
//export const mushroomServerURL = "http://localhost:8000";
export const frontEndServerURL = "http://13.50.15.63:3000";
//export const frontEndServerURL = "http://localhost:3000";


//export const mushroomServerURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
//export const frontEndServerURL = process.env.REACT_APP_FRONTEND_BASE_URL || "http://localhost:3000";
console.log('mushroomServerURL:', mushroomServerURL);

export const mushroomFetch = async ({
  endpoint,
  method = "GET",
  qs = {},
  body,
  contentType = "application/json",
}: {
  endpoint: string;
  method?: string;
  qs?: Record<string, any>;
  body?: BodyInit;
  headers?: any;
  contentType?: string;
}): Promise<any> => {
  console.log(qs, !!qs);
  const searchParams = new URLSearchParams(qs);
  const url = `${mushroomServerURL}/${endpoint}`;
  const response = await fetch(
    `${url}${!!qs && Object.keys(qs).length > 0 ? "?" : "/"
    }${searchParams.toString()}`,
    {
      method: method,
      headers: {
        "Content-Type": contentType,
        "X-CSRFToken": "scNYw4KZUHpt4wFhGXarU64CmcgcZMIw",
      },
      body,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
