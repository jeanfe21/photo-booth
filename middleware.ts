import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow access to /admin/login without token
      if (req.nextUrl.pathname === "/admin/login") {
        return true
      }
      // Require token for other admin routes
      return !!token
    },
  },
  pages: {
    signIn: "/admin/login",
  },
})

export const config = {
  matcher: ["/admin/:path*"]
}

