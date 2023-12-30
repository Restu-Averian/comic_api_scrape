import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/app/constants/BASE_URL";
import getHtml from "@/app/helpers/getHtml";
import { BASE_URL2 } from "@/app/constants/BASE_URL2";

interface trendingProps {
  id: string | null;
  title: string | null;
  imgUrl: string | null;
  type: string | null;
}
export async function GET(req: Request) {
  const html = await getHtml(BASE_URL2);

  const document = new JSDOM(html)?.window.document;

  const trending: Array<trendingProps> = [];

  document.querySelectorAll(".bixbox.hothome .listupd .bs")?.forEach((data) => {
    const id = data
      ?.querySelector("a")
      ?.getAttribute("href")
      ?.replaceAll(`${BASE_URL}/manga`, "")
      ?.replaceAll("/", "");

    trending.push({
      id: `/api/manga?id=${id}` || "",
      title: data?.querySelector("a")?.getAttribute("title") || "",
      imgUrl: data?.querySelector("img")?.getAttribute("src") || "",
      type: data?.querySelector("a .type")?.textContent || "",
    });
  });

  return NextResponse?.json(
    {
      data: trending,
      status: 200,
    },
    { status: 200 }
  );
}
