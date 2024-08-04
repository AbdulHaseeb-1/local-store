"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";

export async function LoginAction(email: string, password: string) {
  const credentials = {
    email: email,
    password: password,
    redirect: false,
  };
  try {
    await signIn("credentials", credentials);
    return { ok: true, message: "Success" };
  } catch (error: any) {
    if (error instanceof CredentialsSignin ) {
      return { ok: false, message: "Invalid Credentials" };
    } else {
      console.log(error.message);
      return { ok: false, message: "Something Went Wrong" };
    }
  }
}
