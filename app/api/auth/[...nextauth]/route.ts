// import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import clientPromise from "@/lib/mongodb";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user: discordUser = { name: null } }) {
      const { name } = discordUser;
      try {
        const mongoClient = await clientPromise;
        await mongoClient
          .db(process.env.MONGODB_NAME)
          .collection("users")
          .updateOne(
            { user_id: name },
            { $set: { user_id: name } },
            { upsert: true }
          );
      } catch (error) {
        console.error(error);
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/teams`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export async function auth(req: NextApiRequest, res: NextApiResponse) {
//   const providers = [
//     DiscordProvider({
//       clientId: DISCORD_CLIENT_ID,
//       clientSecret: DISCORD_CLIENT_SECRET,
//     }),
//   ];

//   const isDefaultSigninPage = req.method === "GET" && req.query.nextauth?.includes("signin");

//   if (isDefaultSigninPage) providers.pop();

//   return await NextAuth(req, res, {providers});
// }
