import "../styles/globals.css";
import { inDevEnvironment } from "../utils/inDevEnvironment";
import { Metadata } from "next";
import localFont from "next/font/local";

const mainFont = localFont({
  src: [
    {
      path: "/EuclidCircularBLight.ttf",
      style: "light",
    },
    {
      path: "/EuclidCircularBMedium.ttf",
      style: "medium",
    },
    {
      path: "/EuclidCircularBRegular.ttf",
      style: "regular",
    },
    {
      path: "/EuclidCircularBSemiBold.ttf",
      style: "semibold",
    },
    {
      path: "/EuclidCircularBBold.ttf",
      style: "bold",
    },
  ],
  variable: "--mainFont",
});

console.log("mainFont: ", mainFont);

export const metadata: Metadata = {
  title: "Piotr Kozłowski - developer/designer portfolio.",
  description:
    "Piotr Kozłowski - portfolio. Front-end developer (javascript, typescript, react, nextjs) | Back-end developer (node / java) | Designer.",
  keywords: [
    "frontend",
    "developer",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "backend",
    "node",
    "java",
    "designer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  ////jsx
  return (
    <html className="overflow-y-scroll">
      <head />
      <body
        className={`overflow-x-hidden ${mainFont.variable} font-mainFont ${
          inDevEnvironment ? "debug-screens" : ""
        } scrollbar scrollbar-w-2 scrollbar-thumb-background_1_lighter scrollbar-thumb-rounded-lg scrollbar-track-background_2_darker `}
      >
        <div id="loading-hook"></div>
        <div id="backdrop-hook"></div>
        <div id="modal-hook"></div>

        {children}
      </body>
    </html>
  );
}
