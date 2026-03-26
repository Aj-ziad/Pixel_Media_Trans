"use client";
import { useTranslations } from "next-intl";

export default function CTABanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="w-full px-6 py-10">
      <div
        className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden px-10 md:px-14 py-14 md:py-20"
        style={{ background: "#ffb900" }}
      >

        {/* Waves */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            right: "-600px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "900px",
            height: "900px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "900px",
              height: "900px",
              borderRadius: "50%",
              background: "#e8a200",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "720px",
              height: "720px",
              borderRadius: "50%",
              background: "#f0b000",
              top: "90px",
              left: "90px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "540px",
              height: "540px",
              borderRadius: "50%",
              background: "#f8c830",
              top: "180px",
              left: "180px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background: "#fbd96a",
              top: "270px",
              left: "270px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "#fde99e",
              top: "360px",
              left: "360px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 " style={{ maxWidth: "500px"}}>
          <h2
            className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {t("title")}
          </h2>

          <p
            className="text-white text-sm font-semibold mb-10 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif", opacity: 0.92 }}
          >
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex items-center justify-between sm:justify-start sm:gap-3 px-8 py-3 rounded-full text-white text-sm font-semibold w-full sm:w-auto"
              style={{
                background: "#1a1a1a",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <span>{t("btnDiscovery")}</span>
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "white",
                  display: "inline-block",
                }}
              />
            </button>

            <button
              className="flex items-center justify-between sm:justify-start sm:gap-3 px-8 py-3 rounded-full text-white text-sm font-semibold w-full sm:w-auto"
              style={{
                background: "#1a1a1a",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <span>{t("btnSamples")}</span>
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "white",
                  display: "inline-block",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}