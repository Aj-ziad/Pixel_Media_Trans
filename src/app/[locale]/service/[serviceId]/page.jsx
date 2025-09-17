//src/app/[locale]/service/[serviceid]/page.jsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServices } from '@/app/[locale]/utils/api';
import { ArrowBigRight } from 'lucide-react';
import ServiceImages from '@/components/ServiceImages';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    serviceId: service.id.toString(),
  }));
}

export default async function ServiceDetails({ params }) {
  const { serviceId, locale } = params;

  const services = await getServices();
  const service = services.find((s) => s.id.toString() === serviceId);

  if (!service) return notFound();

  const otherServices = services.filter((s) => s.id.toString() !== serviceId);

  return (
    <main className="font-sans bg-gray-50">
      {/* Main Service Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 mt-20">
        <ServiceImages 
          mainImage={service.image} 
          additionalImages={service.additionalImages} 
        />

        {/* Right: Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{service.title[locale]}</h1>
            <p className="text-lg text-gray-600 mt-2">{service.description[locale]}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-yellow-400 text-xl">
              {'★'.repeat(Math.floor(service.rating)) + '☆'.repeat(5 - Math.floor(service.rating))}
            </span>
            <span className="text-gray-500">({service.reviews} reviews)</span>
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
              {service.targetAudience[locale]}
            </span>
          </div>

          {/* Packages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Choisir un forfait' : locale === 'ar' ? 'اختر الباقة' : 'Choose Package'}
            </label>
            <div className="grid grid-cols-3 gap-4">
              {service.packages.map((pkg, idx) => (
                <button key={idx} className="border border-gray-300 rounded-lg p-3 text-center hover:border-yellow-400 transition">
                  <span className="font-semibold">{pkg.name[locale]}</span>
                  <p className="text-xs text-gray-500">{pkg.duration[locale]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Options' : locale === 'ar' ? 'إضافات' : 'Add-ons'}
            </label>
            <div className="flex gap-4 flex-wrap">
              {service.addons[locale].map((addon, idx) => (
                <button key={idx} className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-yellow-100 transition">
                  {addon}
                </button>
              ))}
            </div>
          </div>

          <Link href="https://wa.me/0669909179">
            <button className="w-full bg-[#ffb900] text-white font-bold mt-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center justify-center gap-2">
              {locale === 'fr' ? 'Commencer maintenant' : locale === 'ar' ? 'ابدأ الآن' : 'Get Started Now'}
              <span className=" text-white rounded-full p-1"><ArrowBigRight /></span>
            </button>
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === 'fr' ? 'Points forts du service' : locale === 'ar' ? 'أبرز الخدمات' : 'Service Highlights'}
        </h2>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {locale === 'fr' ? 'Fonctionnalités' : locale === 'ar' ? 'الميزات' : 'Features'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-yellow-400 text-2xl">•</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{feature.title[locale]}</h4>
                  <p className="text-sm text-gray-600">{feature.description[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {locale === 'fr' ? 'Comment ça marche' : locale === 'ar' ? 'كيف تعمل' : 'How It Works'}
          </h3>
          <ol className="space-y-4 text-gray-700">
            {service.process[locale].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="bg-yellow-100 text-[#ffb900] font-bold px-3 py-1 rounded-full">{idx + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {locale === 'fr' ? 'Avantages' : locale === 'ar' ? 'الفوائد' : 'Benefits'}
          </h3>
          <ul className="space-y-2 text-gray-700">
            {service.benefits[locale].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          {locale === 'fr' ? 'Découvrir nos autres services' : locale === 'ar' ? 'استكشف الخدمات الأخرى' : 'Explore Other Services'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {otherServices.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img src={s.image} alt={s.title[locale]} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title[locale]}</h3>
                <p className="text-sm text-gray-600 mb-4">{s.description[locale]}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">{s.targetAudience[locale]}</span>
                  <Link href={`/service/${s.id}`} className="text-[#ffb900] font-medium hover:underline">
                    {locale === 'fr' ? 'En savoir plus →' : locale === 'ar' ? 'المزيد →' : 'Learn More →'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}