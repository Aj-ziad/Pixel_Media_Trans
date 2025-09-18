'use client';

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const t = useTranslations("faq");
  const faqs = t.raw("items"); // fetch array of questions & answers

  return (
    <section className="py-32 px-6 bg-muted">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#ffb900] font-semibold text-lg tracking-wide uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#ffb900]">
              {t("title").split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="animate-slide-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-soft border-0 px-6 hover:shadow-medium transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[#ffb900] py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
