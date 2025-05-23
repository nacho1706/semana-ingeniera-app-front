import Image from "next/image";

export default function GroupBox({ groupNumber }) {
return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden pb-10 sm:pb-16">
        <div className="bg-white p-2 text-center">
            <h2 className="font-bold text-lg">GRUPO {groupNumber}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
            <Image
                className="w-16 h-16 mx-auto sm:h-32"
                src="/teams/escudo_test.svg"
                width={64}
                height={64}
                alt={`Equipo 1 del grupo ${groupNumber}`}
            />
                <Image
                className="w-16 h-16 mx-auto sm:h-32"
                src="/teams/escudo_test.svg"
                width={64}
                height={64}
                alt={`Equipo 2 del grupo ${groupNumber}`}
            />
                <Image
                className="w-16 h-16 mx-auto sm:h-32"
                src="/teams/escudo_test.svg"
                width={64}
                height={64}
                alt={`Equipo 3 del grupo ${groupNumber}`}
            />
                <Image
                className="w-16 h-16 mx-auto sm:h-32"
                src="/teams/escudo_test.svg"
                width={64}
                height={64}
                alt={`Equipo 4 del grupo ${groupNumber}`}
            />
        </div>
    </div>
)
}