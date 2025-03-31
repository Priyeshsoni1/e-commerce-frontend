export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/cart`, {
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
export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/cart`);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/cart/` + update.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/cart/` + itemId,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();

    response.data.forEach(async (item) => {
      await deleteItemFromCart(item.id);
    });
    resolve({ status: "success" });
  });
}
