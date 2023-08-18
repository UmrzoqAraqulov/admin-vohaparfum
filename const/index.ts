export const getLocalStorage = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  return token;
};

export const setLocalStorage = (info: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", info);
  }
};

export const deleteLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
