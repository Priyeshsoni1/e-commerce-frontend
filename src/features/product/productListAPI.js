export function fetchAllProducts() {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
export function fetchProductsByFilters(filters) {
  let queryString = "";
  for (const key in filters) {
    if (filters[key] !== "") {
      queryString += `${key}=${filters[key]}&`;
    }
  }
  console.log(queryString, "response");
  return new Promise((resolve) => {
    fetch("http://localhost:8080/products?" + queryString)
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}
