import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./services/secure/public-routes";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  req.cookies;

  const accessToken = req.cookies.get("mei.authToken")?.value;

  const isAuth = !!accessToken; // true ou false se existe authToken

  if (!isAuth && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url)); // se nao estiver logado redireciona para pagina de login
  }

  if (pathname === "/login" && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // se ja estiver logado redireciona para pagina de profissionais
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
