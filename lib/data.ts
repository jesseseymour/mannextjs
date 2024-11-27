import db from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export async function fetchAllUsers() {
  try {
    // const mongoClient = await clientPromise;
    const users = await db.collection("users").find({}).toArray();
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
    const userTeams = await db.collection("users").findOne({ user_id });

    const teams = await db
      .collection("teams")
      .find({ _id: { $in: userTeams?.teams.map((team) => team._id) } })
      .toArray();
    // console.log(
    //   teams.map((team) => {
    //     const is_admin = userTeams.teams.find(
    //       (userTeam) => userTeam._id.toString() === team._id.toString()
    //     )?.is_admin;
    //     const is_creator = userTeams.teams.find(
    //       (userTeam) => userTeam._id.toString() === team._id.toString()
    //     )?.is_creator;
    //     return { ...team, is_admin, is_creator };
    //   })
    // );
    return teams.map((team) => {
      const is_admin = userTeams.teams.find(
        (userTeam) => userTeam._id.toString() === team._id.toString()
      )?.is_admin;
      const is_creator = userTeams.teams.find(
        (userTeam) => userTeam._id.toString() === team._id.toString()
      )?.is_creator;
      return { ...team, is_admin, is_creator };
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeams() {
  try {
    // const mongoClient = await clientPromise;
    return await db.collection("teams").find({}).toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeam(team_id: string) {
  try {
    const team = await db
      .collection("teams")
      .findOne({ _id: new ObjectId(team_id) });
    return team;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeamUsers(team_id: string) {
  try {
    const users = await db
      .collection("users")
      .find({ "teams._id": new ObjectId(team_id) })
      .project({ user_id: 1, _id: 0, teams: 1 })
      .toArray();
    const users_filtered_teams = users.map((user) => {
      return {
        ...user,
        teams: user.teams.filter((team) => team._id.toString() === team_id),
      };
    });
    return users_filtered_teams;
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
