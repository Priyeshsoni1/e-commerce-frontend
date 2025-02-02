export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/own");
    const data = await response.json();
    resolve({ data });
  });
}
export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/" + userData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}
