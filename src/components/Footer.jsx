import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 font-sans">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-full" />
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={46}
                height={44}
                priority
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white italic">
                Pixel Media
              </span>
            </Link>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* About */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("aboutTitle")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">
                    {t("aboutLinks.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t("aboutLinks.whatWeDo")}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    {t("aboutLinks.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:underline">
                    {t("aboutLinks.reviews")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow us */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("followTitle")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="https://www.instagram.com/pixelmedia.ma/" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/profile.php?id=61573457698720" className="hover:underline">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>

            {/* Terms */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("termsTitle")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    {t("termsLinks.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("termsLinks.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    {t("termsLinks.general")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700 w-full" />

        {/* Bottom Row */}
        <div className="sm:flex sm:items-center sm:justify-between pt-8">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            {t("copyright")}
          </span>
          {/* Socials ... keep as you already did */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
