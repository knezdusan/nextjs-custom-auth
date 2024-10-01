import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

export default function FormSignUp() {
  // const [state, action] = useFormState(signup, null);

  return (
    <form className="grid gap-4 py-4" action="#">
      <div className="flex items-center">
        <Input id="email" type="email" placeholder="Your Company email" className="flex-grow" required />
        {/* {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>} */}
      </div>
      <div className="flex items-center">
        <Input
          id="password"
          placeholder="Password"
          type="password"
          className="flex-grow"
          required
          minLength={8}
          maxLength={16}
        />
        {/* {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>} */}
      </div>
      <div className="text-center relative top-3">
        <Button type="submit" className="min-w-56">
          Sign in
        </Button>
      </div>
    </form>
  );
}
