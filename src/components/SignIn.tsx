import { signIn } from "../../auth";
import { FcGoogle } from "react-icons/fc";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}>
      <button
        className="rounded-full border-2 px-10 py-3 bg-white"
        type="submit">
        <div className="flex gap-3 items-center">
          <FcGoogle className="h-8 w-8"/>
          <p>Sign in with Google</p>
        </div>
      </button>
    </form>
  );
}
