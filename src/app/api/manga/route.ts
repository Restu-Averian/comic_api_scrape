import { BASE_URL } from "@/app/constants/BASE_URL";
import { BASE_URL2 } from "@/app/constants/BASE_URL2";
import getHtml from "@/app/helpers/getHtml";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

interface episodesProps {
  id: string | null;
  title: string | null;
  downloadUrl: string | null;
  uploadDate: string | null;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idParam = new URLSearchParams(url.searchParams)?.get("id");

  const html = await getHtml(`${BASE_URL2}/manga/${idParam}`);

  const document = new JSDOM(html)?.window?.document;

  const genres: Array<string | null> = [];
  document.querySelectorAll("span.mgen a")?.forEach((genre: Element) => {
    genres?.push(genre?.textContent);
  });

  const episodes: Array<episodesProps> = [];
  document.querySelectorAll("#chapterlist li")?.forEach((eps) => {
    const id: string | null =
      eps
        ?.querySelector("a")
        ?.getAttribute("href")
        ?.replaceAll(`${BASE_URL}`, "")
        ?.replaceAll("/", "") || "";

    episodes?.push({
      id: `/api/read?eps=${id}`,
      downloadUrl: eps?.querySelector(".dt a")?.getAttribute("href") || "",
      title: eps?.querySelector(".eph-num .chapternum")?.textContent || "",
      uploadDate:
        eps?.querySelector(".eph-num .chapterdate")?.textContent || "",
    });
  });

  const detailData = {
    title: document.querySelector(".entry-title")?.textContent,
    otherTitle: document.querySelector(".wd-full span")?.textContent,
    synopsis: document.querySelector('.wd-full [itemprop="description"]')
      ?.textContent,
    genres: genres,
    episodes,
  };

  return NextResponse?.json({ data: detailData });
}
