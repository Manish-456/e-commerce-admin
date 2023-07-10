import { UserButton, auth } from "@clerk/nextjs";
import {MainNav} from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./ThemeToggle";

export default async function Navbar() {
    const {userId} = auth();
    if(!userId){
        redirect('/sign-in');
    }
    const stores = await prismadb.store.findMany({
        where : {
            userId
        }
    }) 
  return (
    <div className="border-b">
     <div className="h-16 flex items-center px-4">
        <div>
         <StoreSwitcher items={stores} />
        </div>
        <div>
            <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
        </div>
     </div>
    </div>
  )
}
