import { auth } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { handleAuth } from "@/app/actions/handle-auth"

export default async function Dashboard() {
    const session = await auth()

    console.log(session)

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-10">protectedDashboard</h1>
            <p>{session?.user?.email ? "Logged in" : "Not logged in"}</p>

            {
                session?.user?.email && (
                    <form action={handleAuth}>
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Signout</button>
                    </form>
                )
            }
        </div>
    )
}