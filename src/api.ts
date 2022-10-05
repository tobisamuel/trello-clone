import { AppState } from "./state/appStateReducer";

// const BASE_URI = process.env.REACT_APP_BACKEND_ENDPOINT;

export const save = (payload: AppState) => {
  const { _id, draggedItem, lists } = payload;
  const data = { draggedItem, lists };

  return fetch(`http://localhost:4000/save/${_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error while saving the state");
    }
  });
};

export const load = () => {
  return fetch(`http://localhost:4000/load/cl6y0c2230000t8c6e1g25qcp`).then(
    (response) => {
      if (response.ok) {
        return response.json() as Promise<AppState>;
      } else {
        throw new Error("Error while loading the state");
      }
    }
  );
};
