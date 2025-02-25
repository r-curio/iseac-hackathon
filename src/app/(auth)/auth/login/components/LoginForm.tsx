import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/libs/auth-actions"
import SignInWithGoogleButton from "./SignInWithGoogleButton"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { TextSeparator } from "@/components/ui/separator"

export function LoginForm() {
  return (
    <div className="pt-[24px] px-10 text-[#00020A]">
      <div className="flex gap-2">
        <Image src={"/Logo.svg"} alt="logo" width={22} height={22}/>
        <h3 className="text-xl font-bold">Zen</h3>
      </div>
      <form action="">
        <div className="mt-10 px-[60px] pr-28">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold">Sign in</h1>
            <p className="text-lg font-normal">Please login to continue to your account</p>
          </div>
          <div className="mt-[32px] space-y-5">
            <Input
              id="email"
              name="email"
              className="py-6 px-4 rounded-[10px] text-lg placeholder:text-lg border-[#D9D9D9]"
              type="email"
              placeholder="Enter email"
              required
            />
            <Input
              id="password"
              name="password"
              className="py-6 px-4 rounded-[10px] text-lg placeholder:text-lg border-[#D9D9D9]"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <Checkbox />
            <Label className="text-[16px] font-normal">Keep me logged in</Label>
          </div>
          <div className="mt-5 space-y-2">
            <button
                formAction={login}
                className="bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] hover:opacity-90 transition-opacity flex py-[16px] px-4 rounded-xl text-white w-full justify-center"
                style={{boxShadow: "0px 2px 1px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2px 0px rgba(0, 0, 0, 0.25) inset, 0px 0px 1px 4px rgba(255, 255, 255, 0.10)"}}
            >
                Sign in
            </button>
            <p className="text-[#9A9A9A] text-right text-[16px] font-normal">Forgot Password?</p>
          </div>
          <div className="space-y-6 mt-4">
            <TextSeparator text="or"/>
            <SignInWithGoogleButton />
            <p className="text-[#9A9A9A] text-[16px] font-normal text-center">Need an account? <Link className="underline text-[#591DA9]" href={"/auth/signup"}>Create one</Link></p>
          </div>
        </div>
      </form>
    </div>
  )
}