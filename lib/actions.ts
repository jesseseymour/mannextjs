"use server";

import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse, GetServerSideProps } from "next";

interface team_member {
  player_name: string;
  player_id: string;
}
interface team {
  team_name: string;
  url: string;
  num_players: number;
}
interface division {
  division_name: string;
  division_id: string;
  teams: team[];
}
interface League {
  _id: ObjectId;
  league_name: string;
  league_id: string;
  description: string;
  url: string;
  status: string;
  divisions: division[];
}
interface Leagues {
  leagues: League[];
}

export async function createTeam(team: team) {
  try {
    // const mongoClient = await clientPromise;
    console.log({ ...team, url: team.team_name.replace(" ", "-") });

    const newTeam = { ...team, url: team.team_name.replace(" ", "-") };
    await console.log(newTeam);
    // await mongoClient
    //   .db("manleague")
    //   .collection("teams")
    //   .insertOne(newTeam)

    return newTeam;
  } catch (error) {
    console.error(error);
  }
}

export async function myTeams(userId: string) {
  try {
    return await db.collection("teams").find({}).toArray();
  } catch (error) {
    console.error(error);
  }
}
