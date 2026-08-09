'use client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import FAQSection from '@/components/FAQSection';

const Contact = () => {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    try {
      const response = await fetch('https://formspree.io/f/xpwywree', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitSuccess(true);
        e.target.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
     <section className="max-w-6xl mx-auto px-4 py-16 font-sans m-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h3 className="text-[#ffb900] font-bold tracking-wide text-sm m-2">
          {t('sectionTag')}
        </h3>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-[#ca9400] bg-clip-text text-transparent animate-pulse">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 ">
        {/* Left Column - Contact Info */}
        <div >
          <h2
              className="text-5xl font-bold mb-8 tracking-tight text-gray-900"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t('headingFirst')}{' '}
              <span className="italic font-bold" style={{ color: '#ffb900' }}>
                {t('headingSecond')}
              </span>
            </h2> 
          <p className="text-gray-600 mb-8 text-lg font-medium">
            {t('connectDescription')}
          </p>

         <div className="space-y-4 text-sm font-medium">
  <div className="flex items-start gap-4  border  border-gray-200 p-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-yellow-400">
    <div
      className="flex items-center justify-center shrink-0 mt-1"
      style={{
        background: "rgba(255,185,0,0.12)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1.5px solid rgba(255,185,0,0.35)"
      }}
    >
      <Mail className="text-[#ffb900]" size={18} />
    </div>
    <div>
      <h3 className="font-medium">{t('email.label')}</h3>
      <a href="mailto:pixelmedia@gmail.com" className="text-gray-600 text-sm font-medium hover:text-[#ffb900]">
        {t('email.value')}
      </a>
    </div>
  </div>

  <div className="flex items-start gap-4  border  border-gray-200 p-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-yellow-400">
    <div
      className="flex items-center justify-center shrink-0 mt-1"
      style={{
        background: "rgba(255,185,0,0.12)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1.5px solid rgba(255,185,0,0.35)"
      }}
    >
      <Phone className="text-[#ffb900]" size={18} />
    </div>
    <div>
      <h3 className="font-medium">{t('phone.label')}</h3>
      <a href="https://wa.me/0669909179" className="text-gray-600 hover:text-[#ffb900]">
        {t('phone.value')}
      </a>
    </div>
  </div>

  <div className="flex items-start gap-4 border border-gray-200 p-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-yellow-400">
    <div
      className="flex items-center justify-center shrink-0 mt-1"
      style={{
        background: "rgba(255,185,0,0.12)",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1.5px solid rgba(255,185,0,0.35)"
      }}
    >
      <MapPin className="text-[#ffb900]" size={18} />
    </div>
    <div>
      <h3 className="font-medium">{t('location.label')}</h3>
      <p className="text-gray-600">{t('location.value')}</p>
    </div>
  </div>
</div>

          {/* Social Media */}
          <div className="mt-12 text-sm font-medium">
            <h3 className="font-medium mb-4">{t('followUs')}</h3>
           <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Facebook */}
            <Link href="https://www.facebook.com/profile.php?id=61573457698720" className="text-gray-500 hover:text-[#ffb900] dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.5 22.5h4v-9h3l1-4h-4v-2a2 2 0 0 1 2-2h2v-4h-4a4 4 0 0 0-4 4v4h-3v4h3z" strokeWidth="1"/></svg>
              <span className="sr-only">Facebook page</span>
            </Link>

            {/* Instagram */}
            <Link href="https://www.instagram.com/pixelmedia.ma/" className="text-gray-500 hover:text-[#ffb900] dark:hover:text-white ms-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6zm14-2.9h.5"/><path d="M15.462 11.487a3.5 3.5 0 1 1-6.925 1.026a3.5 3.5 0 0 1 6.925-1.026"/></g></svg>
              <span className="sr-only">Instagram page</span>
            </Link>

            {/* WhatsApp */}
            <Link href="https://wa.me/0669909179 " className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                   <svg className="w-4 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                 <span className="sr-only">WhatsApp page</span>
                  </Link>

            {/* TikTok */}
            <Link href="#" className="text-gray-500 hover:text-[#ffb900] dark:hover:text-white ms-5">
              <svg className="w-4 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              <span className="sr-only">TikTok page</span>
            </Link>

           
          </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className=" border-none shadow-md  bg-white rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-6">{t('form.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t('form.name')}
                  className="w-full text-sm font-medium p-3 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t('form.email')}
                  className="w-full text-sm font-medium p-3 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-1"
              >
                {t('form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder={t('form.subject')}
                className="w-full text-sm font-medium p-3 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder={t('form.message')}
                className="w-full text-sm font-medium p-3 border border-gray-300 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ffb900] text-sm font-medium hover:bg-[#f7b91c] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fffefe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z"/></svg>
              {isSubmitting ? t('form.sending') : t('form.send')}
            </button>
          </form>

          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center">
              {t('form.success')}
            </div>
          )}

          <div className="mt-12">
            <h3 className="text-lg font-medium mb-4">{t('cta.title')}</h3>
            <p className="text-gray-500 text-sm font-medium">
              {t('cta.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
    <FAQSection/>

    
    </>
   
    

  );
};

export default Contact;
