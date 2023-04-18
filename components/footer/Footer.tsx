import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import data from "../../data/data.json";
import PhoneNumber from "../contactPage/PhoneNumber";
import useDeviceSize from "../../hooks/useDeviceSize";
import EmailLink from "../contactPage/EmailLink";

const Footer = () => {
  ////vars
  const [width, height, mediaSizeName] = useDeviceSize();
  const [isLinkedInHover, setIsLinkedInHover] = useState(false);
  const [isGithubHover, setIsGithubHover] = useState(false);
  const { githubMainLink } = data;

  ////utils
  //TODO: delete later
  function alertHandler(message: string) {
    alert(message);
  }
  const isDesktop = mediaSizeName === "desktop";
  const nonDesktopContent = (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-x-hidden overflow-y-hidden shadow-input-shadow">
      <div className="w-[calc(100%-64px)] h-[1px] bg-main_white_50 "></div>
      <div className="mt-16 mb-6">
        <Image
          src="/logo_transparency 1.png"
          alt="piotr kozłowski dev-portfolio"
          width={160}
          height={44}
        />
      </div>

      <EmailLink />
      <PhoneNumber />

      <div className="flex -mr-[3px] mt-[14px]">
        <div
          className=""
          onMouseOver={() => {
            setIsGithubHover(true);
          }}
          onMouseLeave={() => {
            setIsGithubHover(false);
          }}
        >
          <a href={githubMainLink} target="_blank" rel="noopener">
            {isGithubHover ? (
              <Image
                src="gitHub_hover.svg"
                alt="github icon"
                width={44}
                height={44}
              />
            ) : (
              <Image
                src="gitHub.svg"
                alt="github icon"
                width={44}
                height={44}
              />
            )}
          </a>
        </div>

        <div
          className=""
          onMouseOver={() => {
            setIsLinkedInHover(true);
          }}
          onMouseLeave={() => {
            setIsLinkedInHover(false);
          }}
        >
          <Link href="/">
            {isLinkedInHover ? (
              <Image
                src="linkedIn_hover.svg"
                alt="linkedIn icon"
                width={44}
                height={44}
                onClick={alertHandler.bind(null, "linkedIn - not implemented")}
              />
            ) : (
              <Image
                src="linkedIn.svg"
                alt="linkedIn icon"
                width={44}
                height={44}
                onClick={alertHandler.bind(null, "linkedIn - not implemented")}
              />
            )}
          </Link>
        </div>
      </div>

      <div className="mb-[27px] mt-[50px] font-style-xs">
        <span className=" text-main_white_50">
          © 2023 Piotr Kozłowski - Portfolio
        </span>
      </div>
    </div>
  );

  const desktopContent = (
    <div className="flex flex-col items-center justify-center h-[178px] overflow-x-hidden overflow-y-hidden  w-container mx-auto shadow-input-shadow">
      <div className="w-full h-[1px] bg-main_white_50 flex"></div>
      <div className="h-[64px]"></div>
      <div className="w-container h-[178px] flex justify-between items-center ">
        <div className="pl-8 w-[300px]">
          <Image
            src="/logo_transparency 1.png"
            alt="piotr kozłowski dev-portfolio"
            width={160}
            height={44}
          />
        </div>
        <div className="flex-col items-center justify-center">
          <EmailLink />
          <PhoneNumber />
        </div>
        <div className="pr-[26px] w-[300px]">
          <div className="flex justify-end">
            <div
              className=""
              onMouseOver={() => {
                setIsGithubHover(true);
              }}
              onMouseLeave={() => {
                setIsGithubHover(false);
              }}
            >
              <a href={githubMainLink} target="_blank" rel="noopener">
                {isGithubHover ? (
                  <Image
                    src="gitHub_hover.svg"
                    alt="github icon"
                    width={21}
                    height={21}
                  />
                ) : (
                  <Image
                    src="gitHub.svg"
                    alt="github icon"
                    width={21}
                    height={21}
                  />
                )}
              </a>
            </div>

            <div
              className="ml-[7px]"
              onMouseOver={() => {
                setIsLinkedInHover(true);
              }}
              onMouseLeave={() => {
                setIsLinkedInHover(false);
              }}
            >
              <Link href="/">
                {isLinkedInHover ? (
                  <Image
                    src="linkedIn_hover.svg"
                    alt="linkedIn icon"
                    width={24}
                    height={24}
                    onClick={alertHandler.bind(
                      null,
                      "linkedIn - not implemented"
                    )}
                  />
                ) : (
                  <Image
                    src="linkedIn.svg"
                    alt="linkedIn icon"
                    width={24}
                    height={24}
                    onClick={alertHandler.bind(
                      null,
                      "linkedIn - not implemented"
                    )}
                  />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="font-style-xs text-main_white_50">
        © 2023 Piotr Kozłowski - Portfolio
      </span>
      <div className="h-8"></div>
    </div>
  );

  ////jsx
  return isDesktop ? desktopContent : nonDesktopContent;
};

export default Footer;
