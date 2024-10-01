import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

export default function AuthRecovery() {
  // const [state, action] = useFormState(signup, null);

  return (
    <form className="grid gap-4 py-4" action="#">
      <div className="flex items-center">
        <Input id="email" type="email" placeholder="Your Company email" className="flex-grow" required />
        {/* {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>} */}
      </div>
      <div className="text-center relative top-3">
        <Button type="submit" className="min-w-56">
          Send Recovery Email
        </Button>
      </div>
    </form>
  );
}
