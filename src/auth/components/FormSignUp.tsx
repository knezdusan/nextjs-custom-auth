import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useFormState } from "react-dom";
import { signup } from "../actions";

export default function FormSignUp() {
  const [state, action] = useFormState(signup, null);

  return (
    <form className="grid gap-4 py-4" action={action}>
      <div className="flex items-center">
        <Input
          id="name"
          name="name"
          placeholder="Your Name"
          className="flex-grow"
          required
          minLength={2}
          maxLength={30}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-6 w-6 ml-2 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter your full name eg. John Smith</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {state && typeof state === "object" && state.errors && "name" in state.errors && (
        <p className="text-red-500 text-sm relative bottom-1 left-3">{state.errors.name}</p>
      )}
      <div className="flex items-center">
        <Input id="email" name="email" type="email" placeholder="Your Company email" className="flex-grow" required />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-6 w-6 ml-2 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>eg. john-smith@acmeinc.com, we will send you a verification email.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {state && typeof state === "object" && state.errors && "email" in state.errors && (
        <p className="text-red-500 text-sm relative bottom-1 left-3">{state.errors.email}</p>
      )}
      <div className="flex items-center">
        <Input
          id="company"
          name="company"
          placeholder="Your Company name"
          className="flex-grow"
          required
          minLength={3}
          maxLength={50}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-6 w-6 ml-2 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Eg. Acme Inc</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {state && typeof state === "object" && state.errors && "company" in state.errors && (
        <p className="text-red-500 text-sm relative bottom-1 left-3">{state.errors.company}</p>
      )}
      <div className="flex items-center">
        <Input
          id="password"
          name="password"
          placeholder="Choose a strong password"
          type="password"
          className="flex-grow"
          required
          minLength={8}
          maxLength={16}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-6 w-6 ml-2 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Min 8 characters, max 16 characters, one uppercase letter, one lowercase letter, one number, one special
                character
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {state && typeof state === "object" && state.errors && "password" in state.errors && (
        <p className="text-red-500 text-sm relative bottom-1 left-3">{state.errors.password}</p>
      )}
      <div className="text-center relative top-3">
        <Button type="submit" className="min-w-56">
          Create Account
        </Button>
      </div>
    </form>
  );
}
