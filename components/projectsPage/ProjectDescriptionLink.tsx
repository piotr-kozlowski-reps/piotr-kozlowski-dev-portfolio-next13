import Image from "next/image";
import React, { forwardRef, Fragment, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { useModalState } from "../../globalState/ModalState";
import { TGithubDetails, TSeeWWWDetails } from "../../types/typings";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

type Props = {
  linkDetails: TGithubDetails | TSeeWWWDetails;
  iconBaseUrl: string;
  iconBaseAlt: string;
  iconHoverUrl: string;
  iconHoverAlt: string;
};

type TLinkDetails = {
  tooltipText: string;
  isIconClickable: boolean;
  isOneLinkOnly_ifFalseThenIsModal: boolean | undefined;
};

const ProjectDescriptionLink = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    ////vars
    const {
      linkDetails,
      iconBaseUrl,
      iconBaseAlt,
      iconHoverUrl,
      iconHoverAlt,
    } = props;

    const router = useRouter();

    const modalState = useModalState();
    const [isIconHovered, setIsIconHovered] = useState(false);

    ////extracting values according to types of input
    function isGithubLinkDetails(link: Object): Boolean {
      return link.hasOwnProperty("isClickableGithub") ? true : false;
    }
    function isSeeWWWLinkDetails(link: Object): Boolean {
      return link.hasOwnProperty("isClickableSeeWWW") ? true : false;
    }
    function mapPropertiesOfLinkDetailsDependingOnType(
      linkDetails: TGithubDetails | TSeeWWWDetails
    ): TLinkDetails {
      if (isGithubLinkDetails(linkDetails)) {
        const linkDetailsTyped = linkDetails as TGithubDetails;
        return {
          tooltipText: linkDetailsTyped.githubTooltipText,
          isIconClickable: linkDetailsTyped.isClickableGithub,
          isOneLinkOnly_ifFalseThenIsModal:
            linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal,
        };
      } else {
        const linkDetailsTyped = linkDetails as TSeeWWWDetails;
        return {
          tooltipText: linkDetailsTyped.seeWWWTooltipText,
          isIconClickable: linkDetailsTyped.isClickableSeeWWW,
          isOneLinkOnly_ifFalseThenIsModal:
            linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal,
        };
      }
    }
    const linkDetailsExtracted: TLinkDetails =
      mapPropertiesOfLinkDetailsDependingOnType(linkDetails);

    const openInNewTab = (url: string) => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    };

    ////modal details and trigger or simple link behavior
    const onMouseUpHandler = () => {
      //githubLinks
      if (isGithubLinkDetails(linkDetails)) {
        const linkDetailsTyped: TGithubDetails = linkDetails as TGithubDetails;

        //show modal for githubLink
        if (
          !linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
          linkDetailsTyped.githubModalContent
        ) {
          const modalContent = DOMPurify.sanitize(
            linkDetailsTyped.githubModalContent,
            { ADD_ATTR: ["target"] }
          );
          modalState.setModalData(modalContent, 0, false);
          modalState.setIsShowModal(true);
        }

        // direct link for githubLink
        if (
          linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
          linkDetailsTyped.githubURL
        ) {
          openInNewTab(linkDetailsTyped.githubURL);
        }

        // show Modal when not enough data is provided
        if (
          (linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
            !linkDetailsTyped.githubURL) ||
          (!linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
            !linkDetailsTyped.githubModalContent)
        ) {
          modalState.setModalData(
            modalState.getModalData().defaultErrorModalContent,
            0,
            false
          );
          modalState.setIsShowModal(true);
        }
      }

      if (isSeeWWWLinkDetails(linkDetails)) {
        const linkDetailsTyped: TSeeWWWDetails = linkDetails as TSeeWWWDetails;

        //show modal for seeWWW
        if (
          !linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
          linkDetailsTyped.seeWWWModalContent
        ) {
          const modalContent = DOMPurify.sanitize(
            linkDetailsTyped.seeWWWModalContent,
            { ADD_ATTR: ["target"] }
          );
          modalState.setModalData(modalContent, 0, false);
          modalState.setIsShowModal(true);
        }

        // direct link for githubLink
        if (
          linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
          linkDetailsTyped.seeWWWURL
        ) {
          openInNewTab(linkDetailsTyped.seeWWWURL);
        }

        // show Modal when not enough data is provided
        if (
          (linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
            !linkDetailsTyped.seeWWWURL) ||
          (!linkDetailsTyped.isOneLinkOnly_ifFalseThenIsModal &&
            !linkDetailsTyped.seeWWWModalContent)
        ) {
          modalState.setModalData(
            modalState.getModalData().defaultErrorModalContent,
            0,
            false
          );
          modalState.setIsShowModal(true);
          modalState.setIsShowModal(true);
        }
      }

      return () => {};
    };

    ////jsx
    return (
      <div className="w-[44px] h-[44px] relative invisible" ref={ref}>
        <Tooltip content={linkDetailsExtracted.tooltipText}>
          {linkDetailsExtracted.isIconClickable ? (
            <div
              className="cursor-pointer icon-link"
              title=""
              onMouseOver={() => {
                setIsIconHovered(true);
              }}
              onMouseLeave={() => {
                setIsIconHovered(false);
              }}
              onMouseUp={onMouseUpHandler}
            >
              {isIconHovered ? (
                <Image
                  src={iconHoverUrl}
                  alt={iconHoverAlt}
                  width={44}
                  height={44}
                />
              ) : (
                <Image
                  src={iconBaseUrl}
                  alt={iconBaseAlt}
                  width={44}
                  height={44}
                />
              )}
            </div>
          ) : (
            <div className="cursor-default opacity-20 z-100" title="">
              <Image
                src={iconBaseUrl}
                alt={iconBaseAlt}
                width={44}
                height={44}
              />
            </div>
          )}
        </Tooltip>
      </div>
    );
  }
);

export default ProjectDescriptionLink;
