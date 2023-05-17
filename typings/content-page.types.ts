type ContentPageMeta = {
  title: string;
  description: string;
  meta: string;
};

export type ContentPage<T> = {
  sections: Array<T>;
  meta: ContentPageMeta;
};
