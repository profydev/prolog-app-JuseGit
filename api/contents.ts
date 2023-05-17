import { axios } from "./axios";
import { ContentPage } from "@typings/content-page.types";
import { Content } from "./contents.types";

const ENDPOINT = "/content-page/";

export async function getContentPage(slug: string) {
  const { data } = await axios.get<ContentPage<Content>>(`${ENDPOINT}${slug}`);
  return data;
}
