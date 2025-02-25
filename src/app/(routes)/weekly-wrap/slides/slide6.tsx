import React from "react";
import { useGSAP } from "@gsap/react";
import Slide from "../components/slide";
import Image from "next/image";

const SixthSlide = ({ timeline }: { timeline: GSAPTimeline }) => {
  useGSAP(() => {
    timeline.add("start");

    timeline.fromTo(
      ".welcome",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: "expo.inOut",
      },
      "start",
    );

    timeline.fromTo(
      ".glow-purple",
      {
        opacity: 1,
        y: 1000,
      },
      { opacity: 0, y: -100, duration: 6 },
      "<",
    );

    timeline.fromTo(
      ".glow-purple",
      {
        opacity: 1,
        y: -1000,
      },
      { opacity: 0, y: 100, backgroundColor: "#75A3EB", duration: 6 },
      "<0.5",
    );

    timeline.to(
      ".group-1",
      { opacity: 0, y: -100, duration: 1, ease: "expo.inOut" },
      "<4",
    );

    timeline.fromTo(
      ".group-2",
      { opacity: 0 },
      { opacity: 1, duration: 2 },
      ">1",
    );

    timeline.to(
      ".slide",
      {
        opacity: 0,
      },
      ">10",
    );
  });

  return (
    <Slide className="slide relative">
      <div className="ml-20 flex h-full w-1/2 flex-col items-center justify-center gap-2"></div>
      <div className="glow-purple absolute left-1/2 top-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[150px]" />

      <div className="group-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 space-y-4 text-center text-5xl font-semibold text-white">
        <p className="welcome leading-normal">
          and for your cat personality of this week...
        </p>
      </div>

      <div className="group-2 absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[#090210]">
        <div className="flex h-3/4 w-full items-center justify-center bg-[#090210]" />
        <div className="flex h-1/4 w-full items-center justify-center bg-[#120622]" />
        <p className="absolute left-1/2 top-[15%] z-50 flex -translate-x-1/2 -translate-y-1/2 gap-2 text-4xl">
          You are a{" "}
          <span className="font-semibold text-accent-200">Curious Cat!</span>
        </p>
        <div className="absolute left-1/2 top-[60%] flex -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-primary/25 drop-shadow-2xl">
          <Image
            src="/cats/curious-cat.png"
            width={1300}
            height={950}
            alt="Curious Cat"
          />
        </div>
      </div>
    </Slide>
  );
};

export default SixthSlide;
