import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { FatwaDetails } from "@/components/FatwaDetails";
import { RelatedFatwas } from "@/components/related/RelatedFatwas";

export default function FatwaPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <FatwaDetails fatwaId={params.id} />
          <RelatedFatwas activeId={params.id} />
        </div>
      </main>
    </div>
  );
}
