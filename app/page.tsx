import Header from "@/components/Header";
import WelcomePanel from "@/components/WelcomePanel";
import StartPanel from "@/components/StartPanel";

export default function Page() {
  return (
    <main className="min-h-screen pb-8">
      <Header />

      {/* center frame */}
      <div className="mx-auto mt-4 w-full max-w-[980px] px-4">
        <div className="frame shadow-frame rounded-md bg-white/70 p-4 md:p-6">
          {/* two-column at desktop; stacked on mobile */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <WelcomePanel />
            <StartPanel />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-6 text-center text-[11.5px] text-gray-600">
        Copyright (c) 2020, Kadira State Residents Registration Agency
      </div>
    </main>
  );
}
