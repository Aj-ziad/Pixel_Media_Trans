import FAQSection from '@/components/FAQSection'
import Gallery from '@/components/Gallery'
import ServicesList from '@/components/ServicesList'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Poppins, Playfair_Display } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['600'], style: ['italic'] })

export default async function page() {
  const response= await fetch('https://aj-ziad.github.io/services-api/services.json')
    const services = await response.json()
    const t = await getTranslations('HomePage');
  return (
    <>
    <div className="relative bg-gray-50 min-h-screen flex flex-col justify-start items-center text-center top-56 px-6  -mt-28 lg:pt-44">
      
      {/* Heading */}
<h1 className={`${poppins.className} text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight mb-4`}>
  {t.rich('mainHeading', {
    highlight: (chunk) => (
      <span className={`${playfair.className} italic text-[#ffb900]`}>
        {chunk}
      </span>
    )
  })}
</h1>

<p className="text-gray-700 mt-6 text-lg md:text-xl max-w-2xl mb-8">
  {t('subtext')}
</p>

<div className="flex flex-col md:flex-row gap-4 mb-16">
  <Link href='/contact'>
    <button className="px-6 py-3 rounded-lg bg-[#ffb900] text-white font-semibold shadow-md hover:bg-[#f7b91c] transition">
      {t('btnConsult')}
    </button>
  </Link>
  <Link href='/services'>
    <button className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition">
      {t('btnServices')}
    </button>
  </Link>
</div>

      <div>
        <WhatsAppIcon/>
      </div>

      {/* Floating Images */}
  <div className="relative w-full hidden md:flex max-w-6xl h-[500px] flex justify-center items-center">
  <img 
    src="/home/create.jpg" 
    alt="img1" 
    className="absolute transform animate-[float_6s_ease-in-out_infinite] top-[-117%] left-[2%] w-[15.5rem] h-[12rem] object-cover rounded-xl shadow-xl rotate-[-10deg]" 
  />
  <img 
    src="/home/ui.jpg" 
    alt="img2" 
    className="absolute transform animate-[float_6s_ease-in-out_infinite] top-[-112%] right-[-2%] w-[13.75rem] h-[12.5rem] object-cover rounded-xl shadow-xl rotate-[8deg]" 
  />
  <img 
    src="/home/social.jpg" 
    alt="img3" 
    className="absolute transform animate-[float_6s_ease-in-out_infinite] bottom-[78%] left-[1%] w-[16rem] h-[15rem] object-cover rounded-xl shadow-xl rotate-[6deg]" 
  />
  <img 
    src="/home/VideoProduction.jpg" 
    alt="img4" 
    className="absolute transform animate-[float_6s_ease-in-out_infinite] bottom-[78%] right-[-6%] w-[16rem] h-[21rem] object-cover rounded-xl shadow-xl rotate-[-7deg]" 
  />
</div>



    </div>
    <div>
      <StatsSection/>
    </div>
    <div className='relative bottom-15'>
      <ServicesList services={services} />
    </div>
    <div>
      <FAQSection/>
    </div>
    <div>
      <Gallery/>
    </div>
    
    <div>
      <TestimonialsSection/>
    </div>
    
    </>
  )
}