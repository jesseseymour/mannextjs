import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse, GetServerSideProps } from "next";
import { ObjectId } from "mongodb";

export async function fetchAllUsers() {
  try {
    const mongoClient = await clientPromise;
    const users = await mongoClient
      .db("manleaugue")
      .collection("users")
      .find({})
      .toArray();
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserTeams() {
  try {
    const session = await getServerSession(authOptions);
    const { user = {} } = session;
    const { name: user_id = null } = user;
    const mongoClient = await clientPromise;
    const mongoteamids = await mongoClient
      .db(process.env.MONGODB_NAME)
      .collection("users")
      .findOne({ user_id: user_id }, { projection: { teams: 1, _id: 0 } });
    const { teams = [] } = mongoteamids || {};
    const mongoteams = await mongoClient
      .db(process.env.MONGODB_NAME)
      .collection("teams")
      .find({ _id: {"$in": teams} })
      .toArray();
    return mongoteams
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeams() {
  try {
    const mongoClient = await clientPromise;
    return await mongoClient
      .db("manleague")
      .collection("teams")
      .find({})
      .toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeam(team_id: string) {
  try {
    const mongoClient = await clientPromise;
    const users = await mongoClient
      .db("manleague")
      .collection("users")
      .find({})
      .toArray();
    const teams: any[] = [];
    users.forEach((user) => teams.push(...user.teams));
    return teams[teams.findIndex((team) => team.team_url === team_id)];
  } catch (error) {
    console.error(error);
  }
}

// export async function fetchLeague(league_id: string) {
//     try {
//         const mongoClient = await clientPromise;

//     } catch (error) {
//         console.error(error)
//     }
// }
