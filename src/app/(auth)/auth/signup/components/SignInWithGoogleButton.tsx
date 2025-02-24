"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/app/libs/auth-actions";
import React from "react";
import Image from "next/image";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full py-6 px-3 rounded-[10px]"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <p className="text-[16px] font-normal">Sign in with Google</p>
      <Image src={"/Google.svg"} width={22} height={22} alt="Google Logo" />
    </Button>
  );
};

export default SignInWithGoogleButton;