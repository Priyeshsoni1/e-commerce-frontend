export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/orders/own`, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/users/own`, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/users/` + userData.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }, // or POST, PUT, etc.
        credentials: "include", // Include cookies with the request

        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
