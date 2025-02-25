
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Zen",
  description: "Authentication pages for Zen application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full'>
      <main className="w-full bg-white">
        <div className="flex w-full border-2 border-black">
          {children}
          <div className="max-w-[45%] min-w-[45%] min-h-[calc(100vh-5px)] pr-4 py-4">
            <div className="bg-[url(/auth_bg.svg)] bg-cover bg-center min-w-full min-h-full rounded-2xl px-10 flex flex-col justify-between">
              <div className="pt-24">
                <h1 className="text-6xl font-medium bg-clip-text text-transparent bg-text-gradient max-w-[490px]">Unlock Your Best Study Habits</h1>
              </div>
              <div className="pb-8 flex justify-end">
                <h1 className="text-[#F8F7FC] text-6xl font-medium">Zen</h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}