import GlowButton from "@/components/ui/glow-button";
import Logo from "@/components/ui/logo";
import { Bot, ChartNoAxesColumn, Goal, Layers2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div
      className="flex h-[700vh] w-screen flex-col gap-4 bg-[#343434]"
      style={{
        background: `linear-gradient(180deg, #00020A 0%, rgba(0, 2, 10, 0.00) 100%), linear-gradient(180deg, #00020A 0%, #6C00B3 45.5%, #00020A 100%)`,
      }}
    >
      <div className="absolute -top-[37.5%] left-1/2 ml-16 h-fit w-fit -translate-x-1/2">
        <Image src={"/landing-stars.png"} width={1424} height={1349} alt="bg" />
      </div>
      <div className="z-50 flex w-full items-center justify-between bg-[#00020a] p-5 px-20">
        <div className="flex items-center gap-2">
          <Logo />
          <p>Zen</p>
        </div>
        <div className="flex items-center gap-4">
          <p>🐈‍⬛ Zen</p>
          <p>⚡ Features</p>

          <GlowButton className="p-2 px-8 text-base" showIcon={false}>
            Sign In
          </GlowButton>
        </div>
      </div>
      <div className="z-10 flex h-full w-full flex-col items-center px-20">
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full items-center justify-center gap-2">
            <Logo size={42} />
            <p className="text-5xl font-medium">Zen</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center leading-[1.25]">
              <p className="h-fit bg-[linear-gradient(146deg,_#F8F7FC_20.35%,_rgba(248,_247,_252,_0.00)_128.73%)] bg-clip-text text-[80px] font-semibold text-transparent">
                Smarter Studying,
              </p>
              <p className="h-fit bg-[linear-gradient(146deg,_#F8F7FC_20.35%,_rgba(248,_247,_252,_0.00)_128.73%)] bg-clip-text text-[80px] font-semibold text-transparent">
                Effortless Focus
              </p>
            </div>
            <p className="w-4/5 text-center text-[#ECECEC]/65">
              Boost your learning with AI-powered notes, insights, and progress
              tracking—all in one place.
            </p>
            <GlowButton>Get Started</GlowButton>
          </div>
        </div>
        <div className="flex h-[90vh] w-full flex-col items-center justify-start gap-4">
          <div className="flex h-full w-full items-start justify-center">
            <Image
              src={"/screenshots/1.png"}
              width={1040}
              height={633}
              alt="Screenshot"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div
            className="flex flex-col items-center justify-center"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, var(--Accent_2, rgba(203, 152, 237, 0.20)) 0%, rgba(11, 1, 33, 0.00) 100%)`,
            }}
          >
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              Features that
            </p>
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              work for your
            </p>
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              future.
            </p>
          </div>
          <p className="w-1/5 text-center text-[#ECECEC]/65">
            Check out our powerful tools designed to enhance your study
            experience.
          </p>
          <div className="mt-24 flex w-fit items-center justify-center">
            <div className="">
              <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-6xl font-bold text-transparent">
                Track Progress <br /> Stay Motivated.
              </p>
              <p className="w-3/4 text-xl font-semibold">
                Stay on top of your learning journey with Weekly Wrap, a
                detailed breakdown of your study habits.
              </p>
            </div>
            <div className="flex w-fit items-center justify-around gap-12">
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <ChartNoAxesColumn size={60} strokeWidth={3} />
                <div className="flex h-1/2 flex-col">
                  <p className="text-base font-bold">Study Stats</p>
                  <p className="text-sm font-semibold">
                    Track your notes, top subjects, and streaks.
                  </p>
                </div>
              </div>
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <Layers2 size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">Summary of Notes</p>
                  <p className="text-sm font-semibold">
                    Quick takeaways for easy review.
                  </p>
                </div>
              </div>
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <Bot size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">AI Suggestions</p>
                  <p className="text-sm font-semibold">
                    Smart tips to boost your study game
                  </p>
                </div>
              </div>
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <Image src={"/cat-icon.png"} width={60} height={60} alt="Cat" />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">
                    Study Purr-sonality
                  </p>
                  <p className="text-sm font-semibold">
                    See your learning style in action!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/screenshots/2.png"}
              width={1260}
              height={607}
              alt="Screenshot"
            />
          </div>
          <div className="mt-24 flex w-fit items-center justify-center">
            <div className="">
              <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-6xl font-bold text-transparent">
                Smart Study Tools, <br /> Powered by AI
              </p>
              <p className="w-3/4 text-xl font-semibold">
                Stay on top of your learning journey with Weekly Wrap, a
                detailed breakdown of your study habits.
              </p>
            </div>
            <div className="flex w-fit items-center justify-around gap-12">
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <Layers2 size={60} strokeWidth={3} />
                <div className="flex h-1/2 flex-col">
                  <p className="text-base font-bold">AI Notes</p>
                  <p className="text-sm font-semibold">
                    Instantly generate summaries from pasted text, uploaded
                    files, or Google Drive docs.
                  </p>
                </div>
              </div>
              <div className="flex w-[175px] flex-col items-start justify-between gap-6">
                <Goal size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">Goal Helper AI </p>
                  <p className="text-sm font-semibold">
                    Get personalized study plans tailored to your learning
                    goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/screenshots/3.png"}
              width={1260}
              height={607}
              alt="Screenshot"
            />
          </div>
          <div className="relative mt-24 flex h-screen w-full items-center justify-center">
            <div className="absolute left-16 top-16 flex items-center gap-12">
              <Image
                src={"/screenshots/4.png"}
                width={467}
                height={377}
                alt="Screenshot"
              />
              <div>
                <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-6xl font-bold text-transparent">
                  Stay on Track. <br /> Effortlessly.
                </p>
                <p className="w-3/4 text-xl font-semibold">
                  Set goals, track progress, and visualize your study activity.
                </p>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-12">
              <Image
                src={"/screenshots/5.png"}
                width={488}
                height={265}
                alt="Screenshot"
              />
              <div className="flex w-fit items-center justify-around gap-8">
                <div className="space-y-4">
                  <div className="flex w-[250px] items-start justify-between gap-6">
                    <ChartNoAxesColumn size={60} strokeWidth={3} />
                    <div className="flex h-1/2 flex-col">
                      <p className="text-base font-bold">Study Stats</p>
                      <p className="text-sm font-semibold">
                        Track your notes, top subjects, and streaks.
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[250px] items-start justify-between gap-6">
                    <Layers2 size={60} />
                    <div className="flex flex-col">
                      <p className="h-1/2 text-base font-bold">
                        Summary of Notes
                      </p>
                      <p className="text-sm font-semibold">
                        Quick takeaways for easy review.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex w-[250px] items-start justify-between gap-6">
                    <Bot size={60} />
                    <div className="flex flex-col">
                      <p className="h-1/2 text-base font-bold">
                        AI Suggestions
                      </p>
                      <p className="text-sm font-semibold">
                        Smart tips to boost your study game
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[250px] items-start justify-between gap-6">
                    <Image
                      src={"/cat-icon.png"}
                      width={60}
                      height={60}
                      alt="Cat"
                    />
                    <div className="flex flex-col">
                      <p className="h-1/2 text-base font-bold">
                        Study Purr-sonality
                      </p>
                      <p className="text-sm font-semibold">
                        See your learning style in action!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
