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
    <html>
      <head />
      <body
        className={`${mainFont.variable} ${
          inDevEnvironment ? "debug-screens" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
