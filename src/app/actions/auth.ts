"use server";
import { login } from "@/auth";
import { error } from "console";

export const loginAction = async (_prevState: any, formData: FormData) => {
  const username = formData.get("email");
  const password = formData.get("password");

  if (!username || !password) return;

  const res = await login(username as string, password as string);

  if (res && res.authLogin && res.authLogin.token) {
    return {
      success: true,
      message: "Login successful",
    };
  } else {
    if (res && res.error) {
      return {
        errors: {
          fetchError: {
            success: false,
            message: "Failed to fetch data",
            error: res.error,
          },
        },
      };
    } else {
      return {
        errors: {
          serverError: {
            success: false,
            error: res.error,
            message: "Server error",
          },
        },
      };
    }
  }
};
