import Image from "next/image";
import React, { forwardRef, Fragment, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { useModalState } from "../../globalState/ModalState";
import { TGithubDetails, TSeeWWWDetails } from "../../types/typings";
import DOMPurify from "dompurify";

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
            linkDetailsTyped.isOneLinkOnly_ifNotThenIsModal,
        };
      }
    }
    const linkDetailsExtracted: TLinkDetails =
      mapPropertiesOfLinkDetailsDependingOnType(linkDetails);

    ////modal details and trigger or simple link behavior
    const onMouseUpHandler = () => {
      //show modal for githubLink
      if (
        isGithubLinkDetails(linkDetails) &&
        !(linkDetails as TGithubDetails).isOneLinkOnly_ifFalseThenIsModal
      ) {
        modalState.setModalContent(
          (linkDetails as TGithubDetails).githubModalContent!
        );
        modalState.setIsShowModal(true);
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
