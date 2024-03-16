import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex py-3 px-10 shadow-sm shadow-white">
      <Image
        src="/viding-logo.svg"
        alt="Viding Logo"
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        width={100}
        height={20}
        priority
      />
    </div>
  );
}
