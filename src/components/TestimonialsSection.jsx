import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("items"); // fetch array from JSON

  return (
    <section className="py-32 px-6 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <span className="text-[#ffb900] font-semibold text-lg tracking-wide uppercase mb-4 block">
            {t("sectionTag")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#ffb900]">
              {t("title").split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-strong transition-all duration-500 hover:-translate-y-2 border-0 shadow-medium bg-card relative overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-accent opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} {t("at")} {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffb900] text-[#ffb900]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#ffb900]/80 mb-4" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
