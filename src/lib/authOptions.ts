import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/admin",
  },
};
