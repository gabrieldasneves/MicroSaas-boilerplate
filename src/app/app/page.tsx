import { auth } from "@/services/auth";

export default async function App() {
  const session = await auth();
  return <h1>{session?.user?.email}</h1>;
}
