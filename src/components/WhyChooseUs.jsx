'use client'
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');

  const features = [
    {
      icon: (
        <Image src="/icons/draw-icon.png" alt="Stunning Custom Design" width={26} height={26} className="object-contain" />
      ),
      title: t('features.design.title'),
      desc: t('features.design.desc'),
    },
    {
      icon: (
        <Image src="/icons/rocket-icon.png" alt="Fast & Reliable Delivery" width={26} height={26} className="object-contain" />
      ),
      title: t('features.delivery.title'),
      desc: t('features.delivery.desc'),
    },
    {
      icon: (
        <Image src="/icons/phone-icon.png" alt="Mobile-First Approach" width={26} height={26} className="object-contain" />
      ),
      title: t('features.mobile.title'),
      desc: t('features.mobile.desc'),
    },
    {
      icon: (
        <Image src="/icons/security-icon.png" alt="Secure & Optimized" width={26} height={26} className="object-contain" />
      ),
      title: t('features.secure.title'),
      desc: t('features.secure.desc'),
    },
    {
      icon: (
        <Image src="/icons/trending-icon.png" alt="Designed to Convert" width={26} height={26} className="object-contain" />
      ),
      title: t('features.convert.title'),
      desc: t('features.convert.desc'),
    },
    {
      icon: (
        <Image src="/icons/headphones-icon.png" alt="Dedicated Support" width={26} height={26} className="object-contain" />
      ),
      title: t('features.support.title'),
      desc: t('features.support.desc'),
    },
  ];

  return (
    <section
      style={{
        
        padding: "80px 24px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <h2
          style={{
            color: "#000000",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            
            marginBottom: "12px",
            letterSpacing: "-0.5px",
            fontWeight: "bold"
          }}
        >
          {t('title')}
        </h2>
        <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto 24px" }}>
          {t('subtitle')}
        </p>
        <div style={{ width: "260px", height: "1px", background: "rgba(0,0,0,0.1)", margin: "0 auto" }} />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          
         
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          maxWidth: "1230px",
          margin: "0 auto",
        }}
      >
        {features.map((f, i) => (
          
          <div
          className="shadow-md  transition-all duration-300 hover:shadow-xl hover:scale-105"
            key={i}
            style={{
             
              backgroundColor: "#ffffff",
              
              borderRadius: "16px",
               
              padding: "32px 48px",
              
              transition: "border-color 0.25s, transform 0.25s, box-shadow  0.25s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(255,185,0,0.45)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255,185,0,0.12)",
                border: "1.5px solid rgba(255,185,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                overflow: "hidden"
              }}
            >
              {f.icon}
            </div>

            <h3
              style={{
                color: "#000000",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {f.title}
            </h3>
            <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}