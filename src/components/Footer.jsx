import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("footer");
  const tContact = useTranslations("contact");

  return (
    <footer className=" font-sans border-t   border-gray-100 text-black mt-12 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <div className="mx-auto w-full  max-w-[1230px] p-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-8 text-center md:text-start">
          
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
              <span className="text-xl font-bold whitespace-nowrap italic text-black">
                Pixel Media
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              {t("description")}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
               {/* Facebook Icon */}
               <Link href="https://www.facebook.com/profile.php?id=61573457698720" className="text-gray-400 hover:text-[#ffb900] transition-colors" target="_blank">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.5 22.5h4v-9h3l1-4h-4v-2a2 2 0 0 1 2-2h2v-4h-4a4 4 0 0 0-4 4v4h-3v4h3z" strokeWidth="1"/></svg>
               </Link>
               {/* Instagram Icon */}
               <Link href="https://www.instagram.com/pixelmedia.ma/" className="text-gray-400 hover:text-[#ffb900] transition-colors" target="_blank">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6zm14-2.9h.5"/><path d="M15.462 11.487a3.5 3.5 0 1 1-6.925 1.026a3.5 3.5 0 0 1 6.925-1.026"/></g></svg>
               </Link>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
              {t("aboutTitle")}
            </h2>
            <ul className="text-gray-600 text-sm space-y-4 font-medium">
              <li><Link href="/about" className="hover:text-[#ffb900] transition-colors">{t("aboutLinks.aboutUs")}</Link></li>
              <li><Link href="/about" className="hover:text-[#ffb900] transition-colors">{t("aboutLinks.whatWeDo")}</Link></li>
              <li><Link href="/services" className="hover:text-[#ffb900] transition-colors">{t("aboutLinks.services")}</Link></li>
              <li><Link href="/reviews" className="hover:text-[#ffb900] transition-colors">{t("aboutLinks.reviews")}</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
              {t("servicesTitle")}
            </h2>
            <ul className="text-gray-600 text-sm space-y-4 font-medium">
              <li><Link href="/service/1" className="hover:text-[#ffb900] transition-colors">{t("servicesLinks.webDev")}</Link></li>
              <li><Link href="/service/1" className="hover:text-[#ffb900] transition-colors">{t("servicesLinks.webDesign")}</Link></li>
              <li><Link href="/service/5" className="hover:text-[#ffb900] transition-colors">{t("servicesLinks.marketing")}</Link></li>
              <li><Link href="/service/5" className="hover:text-[#ffb900] transition-colors">{t("servicesLinks.googleAds")}</Link></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
              {t("helpfulLinksTitle")}
            </h2>
            <ul className="text-gray-600 text-sm space-y-4 font-medium">
              <li><Link href="/faq" className="hover:text-[#ffb900] transition-colors">{t("helpfulLinks.faq")}</Link></li>
              <li><Link href="/contact" className="hover:text-[#ffb900] transition-colors">{t("helpfulLinks.support")}</Link></li>
              <li><Link href="/contact" className="hover:text-[#ffb900] transition-colors flex items-center justify-center md:justify-start gap-2">{t("helpfulLinks.liveChat")} <span className="w-2 h-2 rounded-full mb-2 bg-[#ffb900]"></span></Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
              {t("contactTitle")}
            </h2>
            <ul className="text-gray-600 text-sm space-y-4 font-medium">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-5 h-5 text-[#ffb900] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {tContact("email.value")}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-5 h-5 text-[#ffb900] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                {tContact("phone.value")}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-5 h-5 text-[#ffb900] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {tContact("location.value")}
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200 w-full" />

        {/* Bottom Row - matching Itran Web: copyright left, all rights reserved right */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
           <span>{t("copyright")}</span>
           <span>{t("termsLinks.terms")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
