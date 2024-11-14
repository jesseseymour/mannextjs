import { fetchTeam } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const team_id = (await params).id;
  const team = await fetchTeam(team_id);
  return (
    <div>
      <div>Team {team?.team_name}</div>
      <div>
        Leagues{" "}
        <ul>
          {team.leagues?.map((league) => {
            return (
              <>
                <li>{league.league_name}</li>
                <li>{`Wins ${league.wins} : Losses ${league.losses}`}</li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
