'use client'

import { navLinks } from '@/constants/nav-links'
import { Menu, X, Languages } from 'lucide-react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const t = useTranslations('navbar')
  const pathname = usePathname()
  const router = useRouter()

  function handleLocaleChange(newLocale) {
    router.push(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <div className="flex cursor-pointer text-[#ffb900]" onClick={toggleMenu}>
        {!isOpen ? <Menu /> : <X />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute right-4 top-20 origin-top transition-all duration-300 ${
          isOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
        } w-48 bg-white/90 backdrop-blur-lg border border-white/20 rounded-xl p-4 z-50`}
      >
        <nav className="flex flex-col space-y-3 font-semibold tracking-wide">
          {/* Navigation Links */}
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="py-2 px-4 rounded-lg text-black hover:bg-[#ffb900]"
              onClick={(e) => {
                if (pathname === '/' && link.href.includes('#')) {
                  e.preventDefault();
                  const targetId = link.href.split('#')[1];
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
                toggleMenu();
              }}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* Language Cards */}
          <div className="pt-4 border-t border-gray-200/50">
            <div className="text-xs uppercase text-gray-400 font-bold mb-3 px-2 tracking-wider">
              {t('language')}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLocaleChange('en')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 transition-colors bg-white hover:bg-orange-50 hover:border-orange-200 text-black shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <img src="/flags/en.png" alt="English" className="w-5 h-5 rounded-sm" />
                  <span className="font-bold text-sm">English</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold">EN</span>
              </button>

              <button
                onClick={() => handleLocaleChange('fr')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 transition-colors bg-white hover:bg-orange-50 hover:border-orange-200 text-black shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <img src="/flags/fr.png" alt="Français" className="w-5 h-5 rounded-sm" />
                  <span className="font-bold text-sm">Français</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold">FR</span>
              </button>

              <button
                onClick={() => handleLocaleChange('ar')}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 transition-colors bg-white hover:bg-orange-50 hover:border-orange-200 text-black shadow-sm col-span-2 mt-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <img src="/flags/ar.png" alt="العربية" className="w-5 h-5 rounded-sm" />
                  <span className="font-bold text-sm">العربية</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold">AR</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileNav
