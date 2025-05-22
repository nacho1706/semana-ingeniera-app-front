import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GroupBox from "@/app/fixture/components/group-box";

export default function TournamentGroups() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ffaa8d] via-[#ff7f5c] to-[#ff5533]">
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
          <Link href="/" className="">
            <GroupBox groupNumber={1} />
          </Link>
          <Link href="/" className="">
            <GroupBox groupNumber={2} />
          </Link>
          <Link href="/" className="">
            <GroupBox groupNumber={3} />
          </Link>
          <Link href="/" className="">
            <GroupBox groupNumber={4} />
          </Link>
          <Link href="/" className="">
            <GroupBox groupNumber={5} />
          </Link>
          <Link href="/" className="">
            <GroupBox groupNumber={6} />
          </Link>
        </div>

        <div className="text-center mt-4 mb-8">
          <h1 className="text-white text-2xl font-bold tracking-wider">
            FEMENINO
          </h1>
        </div>
      </div>
    </div>
  );
}
