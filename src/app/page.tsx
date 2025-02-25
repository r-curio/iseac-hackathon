"use client";
import GlowButton from "@/components/ui/glow-button";
import Logo from "@/components/ui/logo";
import { Bot, Cat, ChartNoAxesColumn, Goal, Layers2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Create a ScrollAnimationWrapper component
const ScrollAnimationWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <div
      className="relative flex h-[770vh] w-screen flex-col items-center gap-4 bg-[#343434]"
      style={{
        background: `linear-gradient(180deg, #00020A 0%, rgba(0, 2, 10, 0.00) 100%), linear-gradient(180deg, #00020A 0%, #6C00B3 45.5%, #00020A 100%)`,
      }}
    >
      <div className="absolute left-1/2 top-[-5%] ml-16 h-fit w-fit -translate-x-1/2">
        <Image src={"/landing-stars.png"} width={1424} height={1349} alt="bg" />
      </div>
      <nav className="z-50 flex w-full items-center justify-between bg-[#00020a] p-5 px-20">
        <div className="flex items-center gap-2">
          <Logo />
          <p>Zen</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#zen">🐈‍⬛ Zen</Link>
          <Link href="#features">⚡ Features</Link>
          <Link href="/auth/login">
            <GlowButton className="p-2 px-8 text-base" showIcon={false}>
              Sign In
            </GlowButton>
          </Link>
        </div>
      </nav>
      <div
        className="z-10 flex h-full w-full max-w-[1440px] flex-col items-center"
        id="zen"
      >
        <ScrollAnimationWrapper className="flex h-screen w-full flex-col items-center justify-center gap-4">
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
            <Link href="/auth/login">
              <GlowButton>Get Started</GlowButton>
            </Link>
          </div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="flex h-screen w-full flex-col items-center justify-start gap-4">
          <div className="flex h-full w-full items-start justify-center">
            <Image
              className="absolute left-0 top-[10%] z-0 w-full opacity-10 mix-blend-overlay"
              src={"/pattern.png"}
              width={1440}
              height={1001}
              alt="Pattern"
            />
            <Image
              src={"/screenshots/1.png"}
              width={1040}
              height={633}
              alt="Screenshot"
            />
          </div>
        </ScrollAnimationWrapper>
        <div
          className="flex w-full flex-col items-center justify-center gap-4"
          id="features"
        >
          <ScrollAnimationWrapper className="bg-gradient-radial flex flex-col items-center justify-center from-accent-200/20 to-transparent">
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              Features that
            </p>
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              work for your
            </p>
            <p className="text-6xl font-bold leading-tight tracking-wide text-white">
              future.
            </p>
          </ScrollAnimationWrapper>
          <p className="w-1/5 text-center text-[#ECECEC]/65">
            Check out our powerful tools designed to enhance your study
            experience.
          </p>
          <div className="mt-24 flex w-fit items-center justify-center gap-4">
            <ScrollAnimationWrapper className="">
              <Image
                className="absolute left-0 top-[50%] -z-10 w-full opacity-50"
                src={"/pattern-2.png"}
                width={1440}
                height={2859}
                alt="Pattern"
              />
              <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-6xl font-bold text-transparent">
                Track Progress. <br /> Stay Motivated.
              </p>
              <p className="text-xl font-semibold">
                Stay on top of your learning journey with Weekly Wrap, a
                detailed breakdown of your study habits.
              </p>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex h-full w-fit items-center justify-around gap-8">
              <div className="flex h-full w-[140px] flex-col items-start justify-start gap-6">
                <ChartNoAxesColumn size={60} strokeWidth={3} />
                <div className="flex h-1/2 flex-col">
                  <p className="text-base font-bold">Study Stats</p>
                  <p className="text-sm font-semibold">
                    Track your notes, top subjects, and streaks.
                  </p>
                </div>
              </div>
              <div className="flex h-full w-[140px] flex-col items-start justify-start gap-6">
                <Layers2 size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">Summary of Notes</p>
                  <p className="text-sm font-semibold">
                    Quick takeaways for easy review.
                  </p>
                </div>
              </div>
              <div className="flex h-full w-[140px] flex-col items-start justify-start gap-6">
                <Bot size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">AI Suggestions</p>
                  <p className="text-sm font-semibold">
                    Smart tips to boost your study game
                  </p>
                </div>
              </div>
              <div className="flex h-full w-[140px] flex-col items-start justify-start gap-6">
                <Cat size={60} />
                <div className="flex flex-col">
                  <p className="h-1/2 text-base font-bold">
                    Study Purr-sonality
                  </p>
                  <p className="text-sm font-semibold">
                    See your learning style in action!
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
          <ScrollAnimationWrapper>
            <Image
              src={"/screenshots/2.png"}
              width={1260}
              height={607}
              alt="Screenshot"
            />
          </ScrollAnimationWrapper>
          <div className="mt-24 flex w-fit items-center justify-center">
            <ScrollAnimationWrapper className="">
              <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-6xl font-bold text-transparent">
                Smart Study Tools, <br /> Powered by AI
              </p>
              <p className="w-3/4 text-xl font-semibold">
                Stay on top of your learning journey with Weekly Wrap, a
                detailed breakdown of your study habits.
              </p>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex w-fit items-center justify-around gap-12">
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
            </ScrollAnimationWrapper>
          </div>
          <ScrollAnimationWrapper>
            <Image
              src={"/screenshots/3.png"}
              width={1260}
              height={607}
              alt="Screenshot"
            />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative mt-24 flex h-screen w-full items-center justify-center">
            <div className="absolute left-16 top-16 flex h-fit gap-12">
              <Image
                src={"/screenshots/4.png"}
                width={467}
                height={377}
                alt="Screenshot"
              />
              <div className="flex h-full flex-col gap-4 pt-6">
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
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative flex h-fit w-full items-center justify-center">
            <div className="flex gap-4">
              <div className="flex h-full flex-col gap-1 pt-6">
                <p className="bg-[linear-gradient(180deg,_#E5CCF6_0%,_#CB98ED_32.5%,__#591DA9_100%)] bg-clip-text text-[100px] font-bold leading-none text-transparent">
                  Focus. <br /> Flow. <br /> Finish.
                </p>
                <p className="w-3/4 text-xl font-semibold">
                  Boost productivity with timed study sessions.
                </p>
              </div>
              <Image
                src={"/screenshots/6.png"}
                width={467}
                height={377}
                alt="Screenshot"
              />
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="flex h-screen w-full flex-col items-center justify-center gap-4">
            <div className="flex w-full items-center justify-center gap-2">
              <Logo size={42} />
              <p className="text-5xl font-medium">Zen</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center leading-[1.25]">
                <p className="h-fit bg-[linear-gradient(146deg,_#F8F7FC_20.35%,_rgba(248,_247,_252,_0.00)_128.73%)] bg-clip-text text-[80px] font-semibold text-transparent">
                  Ready to Study Smarter?
                </p>
              </div>
              <p className="w-4/5 text-center text-[#ECECEC]/65">
                Join thousands of students leveling up their study game with
                Zen.
              </p>
              <Link href="/auth/login">
                <GlowButton>Join for Free</GlowButton>
              </Link>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
      <footer className="z-10 flex h-full w-full items-start justify-start gap-6 bg-[#00020a] px-32 py-16">
        <div className="flex h-full w-full flex-col gap-6">
          <p className="text-2xl">Quick Links</p>
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Link href={"#zen"}>
                <p>About Zen</p>
              </Link>
              <Link href={"#features"}>
                <p>Features</p>
              </Link>
            </div>
            <p className="text-[#939393]">© 2025 Zen. All rights reserved.</p>
          </div>
        </div>{" "}
        <div className="flex w-full flex-col gap-6">
          <p className="text-2xl">Study Tools</p>
          <div className="flex flex-col gap-2">
            <p>AI Weekly Wrap</p>
            <p>AI Notes</p>
            <p>Goal Helper AI</p>
            <p>Pomodoro Timer</p>
          </div>
        </div>{" "}
        <div className="flex w-full flex-col gap-6">
          <p className="text-2xl">Contact Us</p>
          <div className="flex flex-col gap-2">
            <p>johnkennethvelano@gmail.com</p>
            <p>nathaliamancilla30@gmail.com</p>
            <p>rodneymaisog@gmail.com</p>
            <p>caritativorenz@gmail.com</p>
            <p>codebypytop@gmail.com</p>
          </div>
          <div className="flex w-full items-center justify-end gap-2 self-end justify-self-end">
            <Logo />
            <p>Zen</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
