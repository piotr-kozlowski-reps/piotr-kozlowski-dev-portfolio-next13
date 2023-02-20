export type TWhichSectionIsActive = {
  home: boolean;
  about: boolean;
  projects: boolean;
  contact: boolean;
};

export type TSliderData = {
  mainTitle: string;
  additionalInfo: string;
  percentage: number;
};

export type TAddSliderToAnimation = (el: {
  element: React.RefObject<HTMLDivElement>;
  percentage: number;
}) => void;

export type TDetailsInfoSet = {
  slidersData: TSliderData[];
  logoImageURL: string;
  clipPathName: string;
  sectionPurposeName: string;
  paragraphText: string;
  sliders: TSliderData[];
  isFirstSectionThenNoTopMargin: boolean;
};

export type TMediaSizeNames = "mobile" | "tablet" | "desktop";
