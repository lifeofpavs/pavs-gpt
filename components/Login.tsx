"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="bg-[#11A37F] min-h-screen flex flex-col items-center justify-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="Logo"
      />{" "}
      <button className="text-white font-bold text-3xl animate-pulse" onClick={() => {
        try {
          signIn('google')
        }catch(e) {
          console.log(`e`, e)
        }
      }}>Sign in to use Pavs GPT</button>
    </div>
  );
}
