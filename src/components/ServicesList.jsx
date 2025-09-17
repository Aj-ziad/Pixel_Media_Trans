'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

const ServicesList = ({ services }) => {
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations("ServicesList");
  const locale =useLocale();

  // Decide which services to display
  const displayedServices = showAll ? services : services.slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 font-sans mt-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-4">
          {t.rich("heading", {
            highlight: (chunk) => <span className="text-[#ffb900]">{chunk}</span>
          })}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700">
          {t("subtext")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Image */}
            <div className="relative">
              <img
                className="w-full h-56 object-cover rounded-t-2xl"
                src={service.image}
                alt={service.title[locale]}
              />
              <div className="absolute top-3 left-3 bg-white text-[#ffb900] text-sm font-medium px-3 py-1 rounded-full shadow">
                {service.targetAudience[locale] || 'Service'}
              </div>
              <div className="absolute top-3 right-3 bg-[#ffb900] text-white text-sm font-medium px-3 py-1 rounded-full shadow">
                {service.rating || '4.5'}
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <h5 className="mb-2 text-lg font-bold text-gray-900">{service.title[locale]}</h5>
              <p className="mb-3 text-sm text-gray-600">{service.description[locale]}</p>

              {/* Reviews */}
              <div className="flex items-center text-sm text-gray-700 mb-4">
                <span className="text-[#f3a91e] text-lg">★★★★★</span>
                <span className="ml-2 text-gray-500">
                  ({t("reviews", { count: service.reviews || 0 })})
                </span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center flex-wrap gap-3">
                <Link href={`/service/${service.id}`}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm bg-[#ffb900] text-white font-medium shadow hover:bg-orange-400 transition">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    {t("btnMoreDetails")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show/Hide Button */}
      {services.length > 3 && (
        <div className="mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-lg text-base bg-[#ffb900] text-white font-semibold shadow hover:bg-orange-400 transition"
          >
            {showAll ? t("btnHide") : t("btnShowAll")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
