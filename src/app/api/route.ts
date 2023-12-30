import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { BASE_URL } from "../constants/BASE_URL";
import getHtml from "../helpers/getHtml";

interface trendingProps {
  id: string | null;
  title: string | null;
  imgUrl: string | null;
  type: string | null;
}
export async function GET(req: Request) {
  return NextResponse?.json(
    {
      data: [
        "/api/trending",
        "/api/new-release",
        "/api/manga?id=",
        "/api/search?s=",
      ],
      status: 200,
    },
    { status: 200 }
  );
}
