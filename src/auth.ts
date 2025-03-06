import { cookies } from "next/headers";

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch("https://testvm1.rokt.io/api/jsonql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "c37861c7-7414-4a40-bbd8-3343662e4483",
      },
      body: JSON.stringify({
        authLogin: {
          email: username,
          pass: password,
        },
      }),
    });

    const resJson = await res.json();
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
