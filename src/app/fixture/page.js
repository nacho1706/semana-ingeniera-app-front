import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GroupBox from "./components/group-box";

export default function TournamentGroups() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FF5501] via-[#ff7f5c] to-[#FF5501] text-black">
      <header className="p-4 relative">
        <Link href="/" className="absolute top-4 left-4 text-white">
          <ArrowLeft size={24} />
        </Link>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-white text-2xl font-bold tracking-wider">
            MASCULINO
          </h1>
        </div>
        <div className="flex-1 px-4 grid grid-cols-2 gap-4 sm:gap-14 md:grid-cols-3">
          <Link href="/fixture/1" className="">
            <GroupBox groupNumber={1} />
          </Link>
          <Link href="/fixture/2" className="">
            <GroupBox groupNumber={2} />
          </Link>
          <Link href="/fixture/3" className="">
            <GroupBox groupNumber={3} />
          </Link>
          <Link href="/fixture/4" className="">
            <GroupBox groupNumber={4} />
          </Link>
          <Link href="/fixture/5" className="">
            <GroupBox groupNumber={5} />
          </Link>
          <Link href="/fixture/6" className="">
            <GroupBox groupNumber={6} />
          </Link>
          <Link href="/fixture/7" className="">
            <GroupBox groupNumber={7} />
          </Link>
        </div>
      </div>

       <div className="flex-1 flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-white text-2xl font-bold tracking-wider mt-30">
            FEMENINO
          </h1>
        </div>
        <div className="flex-1 px-4 grid grid-cols-1 gap-4 sm:gap-14 md:grid-cols-3 mb-10">
          <Link href="/fixture/8" className="md:col-start-2">
            <GroupBox groupNumber={8} />
          </Link>
        </div>
      </div>

    </div>
  );
}
