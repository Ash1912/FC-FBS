import Image from "next/image";

export default function AboutImage() {
  return (
    <section className="w-full flex justify-center items-center mb-12">
      <div className="w-[90%] max-w-[1300px] rounded-[24px] overflow-hidden shadow-[0_4px_32px_#e6e0fa33] bg-white">
        <Image
          src="/images/aboutUS.jpg"
          alt="Team working on tablet"
          width={1300}
          height={650}
          className="w-full h-auto block"
          priority
        />
      </div>
    </section>
  );
}
