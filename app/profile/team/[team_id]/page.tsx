import ManageTeam from "./manage-team";
import { getServerSession } from "next-auth";
import { fetchTeam, fetchTeamUsers } from "@/lib/data";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default async function Page({
  params,
}: {
  params: Promise<{ team_id: string }>;
}) {
  
  const session = await getServerSession(authOptions);
  const team_id = (await params).team_id;
  const team = await fetchTeam(team_id);
  const users = await fetchTeamUsers(team_id);
  console.log(team, users);
  // const { data: session } = useSession();
  return (
    <ManageTeam team={JSON.stringify(team)} team_id={team_id} users={users} current_user={JSON.stringify(users?.find(user => user.user_id === session?.user?.name))} />
  );
}
