"use client";

const TEAM_MEMBERS = [
  {
    _id: {
      $oid: "673272b04b8d7a81a2a63c10",
    },
    user_id: "benchi8489",
    teams: [
      {
        _id: {
          $oid: "672a8a02dea718e4de2eb827",
        },
        is_admin: true,
        is_creator: true,
      },
    ],
  },
  {
    _id: {
      $oid: "new_member",
    },
    user_id: "newmember1234",
    teams: [
      {
        _id: {
          $oid: "672a8a02dea718e4de2eb827",
        },
      },
    ],
  },
];

export default function ManageTeam({
  team: teamString,
  team_id,
  users,
  current_user: currentUserString,
}) {
  const team = JSON.parse(teamString);
  const current_user = JSON.parse(currentUserString);
  const { user_id: current_user_id = "" } = current_user;
  const is_admin = current_user.teams.find(
    (team) => team._id === team_id
  )?.is_admin;
  const is_creator = current_user.teams.find(
    (team) => team._id === team_id
  )?.is_creator;
  return (
    <div>
      Team {team.team_name}
      {is_creator && (
        <p>
          <button
            className="btn"
            onClick={() =>
              document.getElementById("invite_user_modal").showModal()
            }
          >
            Invite user to team
          </button>
          <dialog id="invite_user_modal" className="modal">
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
        </p>
      )}
      <p>Users</p>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.user_id}{" "}
            {is_creator && user.user_id !== current_user_id && "remove user"}
          </li>
        ))}
      </ul>
    </div>
  );
}
