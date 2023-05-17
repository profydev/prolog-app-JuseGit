export type ContentImage = {
  src: string;
  width: number;
  height: number;
};

export type Content = {
  sectionType: string;
  theme: string;
  title: string;
  subtitle: string;
  image: ContentImage;
};
