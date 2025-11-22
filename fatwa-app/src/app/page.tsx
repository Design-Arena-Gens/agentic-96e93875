import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomeScreen } from "@/components/HomeScreen";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <HomeScreen />
      </main>
    </div>
  );
}
