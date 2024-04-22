import { NextResponse } from 'next/server';
import { callbackify } from 'util';
import { withAuth } from "next-auth/middleware";


export default withAuth(
    //function middleware(req) {

    //if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.tolen?.role !== "admin") {
    //return NextResponse.rewrite(new URL('/admin/login', req.nextUrl));
    //}
    //},
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        }
    }
)


export const config = {
    mather: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"]
};
