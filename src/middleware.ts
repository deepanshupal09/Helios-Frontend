import { NextRequest, NextResponse } from "next/server";
import { validate } from "../actions/utils";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const userRoutes = ["/", "/solar-tracking", "/calender", "/profile"];
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const isUserRoute = userRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const cookie = await validate(cookies().get("auth")?.value);

  if (isUserRoute && !cookie) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (isAuthRoute && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
