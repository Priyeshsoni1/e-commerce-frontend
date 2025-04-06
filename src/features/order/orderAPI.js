export function createOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include", // Include cookies with the request

      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/orders/` + order.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request

        body: JSON.stringify(order),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log(queryString, "response");
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/orders?` + queryString,
      {
        method: "GET", // or POST, PUT, etc.
        credentials: "include", // Include cookies with the request
      }
    );
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    console.log(totalOrders, "toatlaCOundt");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
