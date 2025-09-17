"use client";
import { TrendingUp, Users, Star, Award } from "lucide-react";
import { useTranslations } from "next-intl";

const StatsSection = () => {
  const t = useTranslations("StatsSection");

  const stats = [
    { icon: Users, ...t.raw("stats")[0] },
    { icon: TrendingUp, ...t.raw("stats")[1] },
    { icon: Star, ...t.raw("stats")[2] },
    { icon: Award, ...t.raw("stats")[3] }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-gray relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-[#ffb900] font-semibold text-lg tracking-wide uppercase mb-4 block">
            {t("impact")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-foreground mb-6">
            {t.rich("heading", {
              highlight: (chunk) => (
                <span className="text-[#ffb900]">{chunk}</span>
              )
            })}
          </h2>
          <p className="text-xl text-dark-muted max-w-2xl mx-auto">
            {t("subtext")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#ffb900]/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-[#ffb900]/30 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#ffb900]" />
              </div>

              <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-dark-foreground mb-1 group-hover:text-[#ffb900] transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base lg:text-xl font-semibold text-[#ffb900] mb-1">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-700">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
