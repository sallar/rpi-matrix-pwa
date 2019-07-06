const API = "/api";

export const getScreenData = () => fetch(`${API}/data`).then(res => res.json());
export const getViews = () => fetch(`${API}/views`).then(res => res.json());
export const getCurrentView = () =>
  fetch(`${API}/view`).then(res => res.json());
export const changeView = index =>
  fetch(`${API}/view/${typeof index === "number" ? index : ""}`, {
    method: "POST"
  });
