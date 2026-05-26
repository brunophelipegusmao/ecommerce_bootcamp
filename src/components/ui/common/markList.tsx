import Image from "next/image";

const markListItens = [
  { label: "Nike", markName: "Nike", logo: "/icons/nike.svg" },
  { label: "Adidas", markName: "Adidas", logo: "/icons/adidas.svg" },
  {
    label: "New Balance",
    markName: "New Balance",
    logo: "/icons/newbalance.svg",
  },
  { label: "Converse", markName: "Converse", logo: "/icons/converse.svg" },
  { label: "Zara", markName: "Zara", logo: "/icons/zara.svg" },
  { label: "Puma", markName: "Puma", logo: "/icons/puma.svg" },
];

export default function MarkList() {
  return (
    <div className="">
      <div className="flex items-center gap-3 overflow-x-auto px-5 md:px-10 [&::-webkit-scrollbar]:hidden">
        {markListItens.map((mark) => (
          <div
            key={mark.label}
            className="bg-card flex h-20 w-30 flex-none flex-col items-center justify-center gap-2 rounded-xl border py-2 text-center font-semibold"
          >
            {mark.logo ? (
              <>
                <Image
                  src={mark.logo}
                  alt={mark.label}
                  className="mx-auto"
                  width={40}
                  height={50}
                />
                <span>{mark.markName}</span>
              </>
            ) : (
              mark.label
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
