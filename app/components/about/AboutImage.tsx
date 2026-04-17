import Image from "next/image";

export default function AboutImage() {
  return (
    <section className="w-full flex justify-center items-center mb-12">
      <div className="w-[90%] max-w-[1300px] rounded-[24px] overflow-hidden shadow-[0_4px_32px_var(--card-shadow)] bg-[var(--card-bg)]">
        <Image
          src="/images/event_StockiFy26/grandFinale/58.jpg"
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