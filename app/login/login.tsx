import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  // const { data: session } = useSession();

  // if (session) {
  //   return (
  //     <div>
  //       <h2>Logged In</h2>
  //       <button onClick={() => signOut()}>Click here to sign out</button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2>Logged Out</h2>
      <button onClick={() => signIn()}>Click here to sign in</button>
    </div>
  );
}
