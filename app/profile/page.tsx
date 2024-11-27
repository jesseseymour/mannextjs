import Profile from "./profile";
import { fetchTeams, fetchUserTeams } from "@/lib/data";

export default async function Page() {
  const my_teams = await fetchUserTeams();

  return (
    <Profile
      myTeams={JSON.stringify(my_teams)}
    />
  );
}
