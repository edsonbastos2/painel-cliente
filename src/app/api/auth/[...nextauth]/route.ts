import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label:'email', type:'email'},
        password: {label: 'password', type: 'password'}
      },
      
      async authorize(credentials, req) {
        const response = await fetch('http://localhost:8089/auth/login',{
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await response.json()
        console.log('user login: ', user)

        if(user && response.ok) {
          return user
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }