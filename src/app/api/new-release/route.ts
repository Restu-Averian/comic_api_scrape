import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/app/constants/BASE_URL";
import getHtml from "@/app/helpers/getHtml";

interface newReleaseProps {
  id: string | null;
  title: string | null;
  imgUrl: string | null;
}
export async function GET(req: Request) {
  const html = await getHtml(BASE_URL);

  const dom = new JSDOM(html);
  const document = dom?.window?.document;

  const newRelease: Array<newReleaseProps> = [];

  document
    .querySelectorAll(".bixbox")?.[2]
    ?.querySelectorAll(".listupd .utao")
    ?.forEach((data) => {
      const id = data
        ?.querySelector("a")
        ?.getAttribute("href")
        ?.replaceAll(`${BASE_URL}/manga`, "")
        ?.replaceAll("/", "");

      newRelease.push({
        id: `/api/manga?id=${id}` || "",
        title: data?.querySelector("a")?.getAttribute("title") || "",
        imgUrl: data?.querySelector("img")?.getAttribute("src") || "",
      });
    });

  return NextResponse?.json(
    {
      data: newRelease,
      status: 200,
    },
    { status: 200 }
  );
}
