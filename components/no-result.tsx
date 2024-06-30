import Image from "next/image";

function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full w-full bg-white pb-10">
      <Image alt="no result" src="/noResult.png" height={300} width={300} />
      <h1 className="text-[#191919] text-lg font-semibold">No Result Found</h1>
      <h3 className="text-[#8F8F8F] text-sm">
        We Could’t find what you’re looking for{" "}
      </h3>
    </div>
  );
}

export default NoResult;
