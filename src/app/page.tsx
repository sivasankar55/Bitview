import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div className="m-10">
    <SignInButton>
       <Button>
        login
       </Button>
    </SignInButton>
   </div>
  );
}
