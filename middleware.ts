// export { default } from "next-auth/middleware";

// export const config = {
//     matcher: [
//         // Match all routes except the ones specified
//         '/((?!signin|signup|forgetpassword|resetpassword/*|api/authapi|api/auth).*)',
//     ],
// };


import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Bypass middleware for static files and Tailwind CSS
    if (pathname.includes('/_next') || pathname.includes('/static') || pathname.endsWith('.css') || pathname.endsWith('.js')) {
        return NextResponse.next();
    }

    // Redirect logic for authenticated users
    if (session && ( pathname === '/signin' || pathname === '/signup' || pathname.startsWith('/forgetpassword')  || pathname.startsWith('/verifyemail') || pathname.startsWith('/resetpassword'))) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Exclude routes that don't require authentication
    if (!session && !(pathname === "/about" || pathname == "/contact" || pathname == "/terms" || pathname == "/privacy") && !pathname.includes("/images") && !pathname.includes('/api/auth') && !pathname.includes('/api/test') && !(pathname === '/signin' || pathname === '/signup' || pathname.startsWith('/forgetpassword') || pathname.startsWith('/verifyemail')  || pathname.startsWith('/resetpassword'))) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/signin', 
        '/signup', 
        '/forgetpassword/:path*', 
        '/resetpassword/:path*',
        '/verifyemail/:path*',
        '/((?!api/auth).*)' // Match all routes except the ones starting with /api/auth
    ]
};