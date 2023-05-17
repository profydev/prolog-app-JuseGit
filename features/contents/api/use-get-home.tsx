import { useQuery } from "@tanstack/react-query";
import { getContentPage } from "@api/contents";
import type { Content } from "@api/contents.types";
import { ContentPage } from "@typings/content-page.types";

export function useGetContent(slug: string) {
  return useQuery<ContentPage<Content>, Error>(["contents"], () =>
    getContentPage(slug)
  );
}
