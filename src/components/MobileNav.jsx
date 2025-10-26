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
              onClick={toggleMenu}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg text-black hover:bg-[#ffb900]">
                <Languages /> {t('language')}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-full bg-white/90">
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2 py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('en')}
              >
                <img src="/flags/en.png" alt="English" className="w-5 h-5 rounded-sm" />
                {t('english')}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2 py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('fr')}
              >
                <img src="/flags/fr.png" alt="Français" className="w-5 h-5 rounded-sm" />
                {t('french')}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2 py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('ar')}
              >
                <img src="/flags/ar.png" alt="العربية" className="w-5 h-5 rounded-sm" />
                {t('arabic')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </>
  )
}

export default MobileNav
