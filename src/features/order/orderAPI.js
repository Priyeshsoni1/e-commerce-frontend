export function createOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
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
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    console.log(totalOrders, "toatlaCOundt");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
