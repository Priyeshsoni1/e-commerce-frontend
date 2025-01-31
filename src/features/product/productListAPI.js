export function fetchAllProducts() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/products")
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
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
export function fetchBrands() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/brands")
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchProductById(id) {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/products/" + id)
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchCategories() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
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
