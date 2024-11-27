// import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import db from "@/lib/mongodb";

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
        // const mongoClient = await clientPromise;
        await db
          .collection("users")
          .updateOne(
            { user_id: name },
            { $set: { user_id: name } },
            { upsert: true }
          );
      } catch (error) {
        return false;
      }
      return true;
    },
    async jwt({ token, account, profile}) {
      // console.log(token)
      return token;
    },
    async session({session = {}, token}) {
      const {user = {}} = session;
      const {teams = null, name} = user;

      if (!teams) {
        const mongouser = await db
          .collection("users")
          .findOne({user_id: name})
        const {teams = []} = mongouser;
        return {...session, user: {...session.user, teams: teams}};
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/profile`;
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
