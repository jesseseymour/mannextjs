"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
// import { fetchTeams } from "@/lib/data";
import { createTeam } from "@/lib/actions";

const initialState = {};

export default function Profile({leagueTeams}) {
  // const [teamList, setTeamList] = useState(null);
  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState(JSON.parse(leagueTeams))

  useEffect(() => {
    //const teams = await fetchTeams();
  })

  // useEffect(() => {
  //   setTeams();
  // });
  // const [state, formAction] = useFormState(createTeam, initialState)
  // const teams = await fetchTeams();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = Object.fromEntries(formData);
  //   createTeam(data)

  // }
  return (
    <div>
      {teams && (
        <>
          <h2>League teams: {teams.map(team => `${team.team_name}, `)}</h2>
        </>
      )}
      <h2>Create new team</h2>
      <div>
        <form>
          <input type="text" name="team_name" />
          <button
            onClick={async (event) => {
              event.preventDefault();
              const newTeam = await createTeam({ team_name: "new team" });
              setTeams([...teams, newTeam]);
            }}
          >
            Submit
          </button>

          {/* {result && <p>New Team: {JSON.stringify(result)}</p>} */}
        </form>
      </div>
    </div>
  );
}
