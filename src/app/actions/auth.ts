"use server";
import { login, isSuccessfulLoginResponse } from "@/auth";

export const loginAction = async (_prevState: any, formData: FormData) => {
  const username = formData.get("email");
  const password = formData.get("password");

  if (!username || !password) return;

  const res = await login(username as string, password as string);

  //success case
  if (isSuccessfulLoginResponse(res)) {
    return {
      success: true,
      message: "Login successful",
    };
  }

  //error case
  if (res.error instanceof Error) {
    return {
      success: false,
      error: res.error,
      message: res.error.message,
    };
  } else {
    return {
      success: false,
      error: new Error("Failed to login"),
      message: "Failed to login",
      rawError: res.error,
    };
  }
};
