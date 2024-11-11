import { fetchUserTeams } from "@/lib/data";
import Link from "next/link";

export default async function Page() {
  const teams = await fetchUserTeams();
  return (
    <div>
      <ul>
        {teams?.map((team) => (
          <li key={team.team_name}><Link href={`/teams/${team.url}`}>{team.team_name}</Link></li>
        ))}
      </ul>
    </div>
  );
}
