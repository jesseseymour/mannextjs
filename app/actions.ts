"use server";

import client from "@/lib/mongodb";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse, GetServerSideProps } from "next";

interface team_member {
  player_name: string;
  player_id: string;
}
interface team {
  team_name: string;
  team_id: string;
  team_members: team_member[];
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

export const getLeagues = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mongoClient = await clientPromise;
    return await mongoClient.db("manleague").collection("leagues").find({});

    return { props: {} };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};
