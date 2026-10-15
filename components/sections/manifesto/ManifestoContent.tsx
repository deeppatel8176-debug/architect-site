"use client";

export default function ManifestoContent() {
  return (
    <div className="manifesto-content">

      <span className="block text-[11px] uppercase tracking-[0.6em] text-white/50">
        Manifesto
      </span>

      <div className="mt-16 grid grid-cols-1 gap-20 lg:grid-cols-2">

        <div>

          <h2 className="manifesto-title text-white font-extralight leading-[0.9] tracking-[-0.04em]
          text-[52px] md:text-[72px] xl:text-[120px]">

            Architecture
            <br />
            begins
            <br />
            with emotion.

          </h2>

        </div>

        <div className="flex items-end">

          <div className="max-w-xl">

            <p className="text-lg leading-9 text-white/70">

              Every project begins with a dialogue
              between people, light, material and
              architecture.

            </p>

            <p className="mt-10 text-lg leading-9 text-white/70">

              We create contemporary spaces that
              combine simplicity, precision and
              timeless design.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}