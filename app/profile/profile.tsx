"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { fetchUserTeams } from "@/lib/data";
import { createTeam } from "@/lib/actions";
import { useRouter } from "next/navigation";

const initialState = {};

export default function Profile({ myTeams }) {
  const router = useRouter();
  console.log(JSON.parse(myTeams));
  return (
    <div>
      <h3 className="text-white text-lg">My Teams</h3>
      {myTeams && (
        <>
          <div className="flex space-x-4">
            {JSON.parse(myTeams).map((team) => {
              const { is_admin = false, is_creator = false, team_name = "", _id } = team;
              return (
                <div
                  className="card bg-primary w-96 shadow-xl"
                  key={team.team_name}
                >
                  <div className="card-body">
                    <h2 className="card-title">{team_name}</h2>
                    {is_admin && <button className="btn" onClick={() => router.push(`/profile/team/${_id}`)}>Manage Team</button>}
                    <p>Admin? {is_admin ? "yes": "no"}</p>
                    <p>Creator? {is_creator ? "yes": "no"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <button
        className="btn"
        onClick={() => document.getElementById("new_team_modal").showModal()}
      >
        Create new team
      </button>
      <dialog id="new_team_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* <div>
        <form
          className="max-w-sm"
          onSubmit={async (event) => {
            event.preventDefault();
            const newTeam = await createTeam({ team_name: "new team" });
            setTeams([...teams, newTeam]);
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="team_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            ></label>
            <input
              type="text"
              name="team_name"
              id="team_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New team name"
              required
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
            onClick={(event) => false}
          >
            Submit
          </button>

          
        </form>
      </div> */}
    </div>
  );
}
