import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const glaresPositions = [
  {
    left: "0%",
    top: "0%",
    delay: "0s",
    duration: "5s",
  },
  {
    left: "25%",
    top: "15%",
    delay: "0.5s",
    duration: "7s",
  },
  {
    left: "75%",
    top: "20%",
    delay: "1.2s",
    duration: "6s",
  },
  {
    left: "90%",
    top: "45%",
    delay: "0.8s",
    duration: "8s",
  },
  {
    left: "60%",
    top: "75%",
    delay: "1.5s",
    duration: "5.5s",
  },
  {
    left: "10%",
    top: "85%",
    delay: "2s",
    duration: "7.5s",
  },
  {
    left: "45%",
    top: "35%",
    delay: "0.3s",
    duration: "6.5s",
  },
  {
    left: "80%",
    top: "5%",
    delay: "1.8s",
    duration: "4.5s",
  },
  {
    left: "35%",
    top: "95%",
    delay: "1s",
    duration: "6.8s",
  },
];
