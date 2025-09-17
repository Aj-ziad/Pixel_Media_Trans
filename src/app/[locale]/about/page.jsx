import React from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("about");

  return (
    <div>
      <Head>
        {/* Load Poppins font only for this page */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            src="/videos/video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="max-w-2xl space-y-6">
            <h1
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="text-xl sm:text-2xl text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t("hero.subtitle")}
            </p>
            <div className="border-t border-white/40 my-6 w-20 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        className="w-full bg-[#f5f5f5] py-16 px-4 sm:px-6"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-medium text-[#ffb900] text-center">
            {t("who.title")}
          </h2>
          <h4 className="text-black text-xl text-center font-medium">
            {t("who.subtitle")}
          </h4>
          <p className="text-lg text-[#212121] text-center leading-relaxed">
            {t("who.text")}
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-medium text-[#ffb900] text-center">
            {t("why.title")}
          </h2>
          <h4 className="text-black text-xl text-center font-medium">
            {t("why.subtitle")}
          </h4>
          <p className="text-lg text-[#212121] text-center leading-relaxed">
            {t("why.text")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
