import { BASE_URL } from "@/app/constants/BASE_URL";
import getHtml from "@/app/helpers/getHtml";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

interface epsProps {
  src: string | null;
  alt: string | null;
}
export async function GET(req: Request) {
  const url = new URL(req?.url);
  const epsParam = new URLSearchParams(url?.searchParams);
  const epsVal = epsParam?.get("eps");

  try {
    const html = await getHtml(`${BASE_URL}/${epsVal}`);

    const document = new JSDOM(html)?.window?.document;

    const epsPage: Array<epsProps> = [];

    document.querySelectorAll("#readerarea img")?.forEach((eps) => {
      epsPage.push({
        src: eps?.getAttribute("src") || "",
        alt: eps?.getAttribute("alt") || "",
      });
    });
    return NextResponse?.json(
      {
        data: epsPage,
        status: 200,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse?.json(
      {
        error: err?.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
