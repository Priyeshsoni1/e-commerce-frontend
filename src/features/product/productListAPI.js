export function fetchAllProducts() {
  return new Promise((resolve) => {
    fetch(`${import.meta.env.VITE_APP_URL}/products`, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchProductsByFilters(filters, sort, pagination, admin) {
  console.log(pagination, "responsePagination");
  //TODO: on server we will support multi values in filter
  // TODO: sever will filter deleted products in case of non-admin user
  let queryString = "";
  for (const key in filters) {
    const categoryValues = filters[key];

    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  console.log(queryString, "response");
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/products?` + queryString,
      {
        method: "GET", // or POST, PUT, etc.
        credentials: "include", // Include cookies with the request
      }
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
export function fetchBrands() {
  return new Promise((resolve) => {
    fetch(`${import.meta.env.VITE_APP_URL}/brands`, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchProductById(id) {
  return new Promise((resolve) => {
    fetch(`${import.meta.env.VITE_APP_URL}/products/` + id, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchCategories() {
  return new Promise((resolve) => {
    fetch(`${import.meta.env.VITE_APP_URL}/categories`, {
      method: "GET", // or POST, PUT, etc.
      credentials: "include", // Include cookies with the request
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include", // Include cookies with the request

      body: JSON.stringify(product),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/products/` + update.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include", // Include cookies with the request

        body: JSON.stringify(update),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
