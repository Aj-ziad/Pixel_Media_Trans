import { getGallery } from "@/app/[locale]/utils/api";
import { useTranslations } from "next-intl";
import React from "react";
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/600.css"; // Semi-bold

const Gallery = async () => {
  const t = useTranslations("gallery");
  const galleryData = await getGallery();

  return (
    <section className="py-12 px-4 text-white">
      <div className="text-center mb-8">
        <h3 className="text-[#ffb900] font-bold tracking-wide uppercase text-sm">
          {t("sectionTag")}
        </h3>
        <h2 className="text-3xl text-black sm:text-4xl font-bold mt-2 font-sans">
          {t("title")}
        </h2>
        <p className="text-gray-700 mt-2 font-sans">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {galleryData.map((item, index) => (
          <div
            key={index}
            className="shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.img}
              alt={`${t("imageAlt")} ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
