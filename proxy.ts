
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userServices } from './src/services/user.services'
import { Roles } from './src/constants/roles'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    let isAuthenticated = false
    let isAdmin = false

    const pathname = request.nextUrl.pathname

    const { data } = await userServices.getSession()

    if (data) {
        isAuthenticated = true
        isAdmin = data.user.role === Roles.admin
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if(isAdmin && pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }

    if(!isAdmin && pathname.startsWith('/admin-dashboard')){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/dashboard', 
        '/dashboard/:path*',
        '/admin-dashboard',
        '/admin-dashboard/:path*',
    ] ,
}