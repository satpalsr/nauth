import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
      ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          if (account.provider === 'google') {

            const email = profile.email;

          return true;

          }
        }
    }
}