import { getGallery } from "@/app/[locale]/utils/api";
import { getTranslations } from "next-intl/server";
import React from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import GalleryClient from "./GalleryClient";

const Gallery = async () => {
  const t = await getTranslations("gallery");
  const galleryData = await getGallery();

  return (
    <GalleryClient
      images={galleryData}
      sectionTag={t("sectionTag")}
      title={t("title")}
      subtitle={t("subtitle")}
      imageAlt={t("imageAlt")}
    />
  );
};

export default Gallery;
