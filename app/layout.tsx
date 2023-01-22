import "../styles/globals.css";
import { inDevEnvironment } from "../utils/inDevEnvironment";

import localFont from "@next/font/local";
const mainFont = localFont({
  src: [
    {
      path: "EuclidCircularBLight.ttf",
      style: "light",
    },
    {
      path: "EuclidCircularBMedium.ttf",
      style: "medium",
    },
    {
      path: "EuclidCircularBRegular.ttf",
      style: "regular",
    },
    {
      path: "EuclidCircularBSemiBold.ttf",
      style: "semibold",
    },
    {
      path: "EuclidCircularBBold.ttf",
      style: "bbold",
    },
  ],
  variable: "--mainFont",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="overflow-y-scroll">
      <head />
      <body
        className={`overflow-x-hidden ${mainFont.variable} ${
          inDevEnvironment ? "debug-screens" : ""
        } scrollbar scrollbar-w-2 scrollbar-thumb-background_1_lighter scrollbar-thumb-rounded-lg scrollbar-track-background_2_darker `}
      >
        {children}
      </body>
    </html>
  );
}
