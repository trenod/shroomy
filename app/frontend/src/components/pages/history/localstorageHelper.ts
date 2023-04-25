const LOCAL_STORAGE_LOCATION = "preditcionHistory";

export interface IPredictionHistoryEntry {
  time: string; //ISO string,
  response: any;
  name: string;
}

export const savePredictionInLocalStorage: (response: any) => void = (
  response: any
) => {
  const currentTime = new Date().toISOString();

  const name = response[0].predicted_name;
  const prob = Number(response[0].probability * 100).toFixed(2);

  const newEntry: IPredictionHistoryEntry = {
    time: currentTime,
    response: response,
    name: `${name} ${prob}%`,
  };

  const storedData = localStorage.getItem(LOCAL_STORAGE_LOCATION);
  let history: IPredictionHistoryEntry[] = [];

  if (storedData) {
    history = JSON.parse(storedData);
  }

  history.push(newEntry);
  localStorage.setItem(LOCAL_STORAGE_LOCATION, JSON.stringify(history));
};

export const getSavedPredictoins: () => IPredictionHistoryEntry[] = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_LOCATION);
  let history: IPredictionHistoryEntry[] = [];
  if (storedData) {
    history = JSON.parse(storedData);
  }
  return history;
};
