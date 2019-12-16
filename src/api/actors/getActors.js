import { BASE_API_URL } from "../constants";

const getActors = async (url, options = { method: "GET" }) => {
  const result = await fetch(`${BASE_API_URL}/${url}`, options);
  return result.json();
};

export default getActors;
