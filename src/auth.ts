import { cookies } from "next/headers";

type SuccessfulLoginResponse = {
  authLogin: {
    firstname: string;
    token: string;
    refreshToken: string;
  };
};

export const login = async (username: string, password: string) => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set");
    }

    if (!process.env.API_BASE) {
      throw new Error("API_KEY is not set");
    }
    const res = await fetch(new URL("jsonql", process.env.API_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify({
        authLogin: {
          email: username,
          pass: password,
        },
      }),
    });

    if (!res.ok) throw new Error("Something went wrong");

    const resJson = await res.json();

    //assuming server returns expected response structure with valid credentials
    if (
      resJson.authLogin === "invalid credentials" ||
      !isSuccessfulLoginResponse(resJson)
    )
      throw new Error("Invalid credentials");

    const cookiesStore = await cookies();
    cookiesStore.set("token", resJson.authLogin.token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });
    cookiesStore.set("userFirstName", resJson.authLogin.firstname);
    return resJson;
  } catch (error) {
    console.warn(error);
    //TODO::probably should re-throw or handle it as necessary
    return { error };
  }
};

export function isSuccessfulLoginResponse(
  response: any
): response is SuccessfulLoginResponse {
  return (
    response &&
    typeof response === "object" &&
    response.hasOwnProperty("firstname") &&
    response.hasOwnProperty("token") &&
    response.hasOwnProperty("refreshToken")
  );
}
