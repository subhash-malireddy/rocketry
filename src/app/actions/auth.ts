"use server";
import { login } from "@/auth";

export const loginAction = async (_prevState: any, formData: FormData) => {
  const username = formData.get("email");
  const password = formData.get("password");

  if (!username || !password) return;

  const res = await login(username as string, password as string);

  // Success case
  if (res && res.authLogin && res.authLogin.token) {
    return {
      success: true,
      message: "Login successful",
    };
  }

  // Fetch error case
  if (res && res.error) {
    return {
      errors: {
        fetchError: {
          success: false,
          errors: {
            fetchError: {
              error: res.error,
              message: "Failed to fetch data",
            },
          },
        },
      },
    };
  }

  // Default server error case
  return {
    errors: {
      serverError: {
        error: res?.error,
        message: "Server error",
      },
    },
  };
};
