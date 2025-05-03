export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include", // Include cookies with the request

        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    console.log(data, "response of user");
    resolve({ data });
  });
}
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          credentials: "include",
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/auth/check`,
        {
          method: "GET", // or POST, PUT, etc.
          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/auth/logout`,
        {
          method: "GET", // or POST, PUT, etc.
          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data: "success" });
      } else {
        const error = response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/auth/reset-password-request`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },

          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/auth/reset-password`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },

          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}
