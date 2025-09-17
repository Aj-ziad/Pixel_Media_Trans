'use client'

import { navLinks } from '@/constants/nav-links'
import { Menu, X, Languages } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const t = useTranslations('navbar')
  const pathname = usePathname()
  const router = useRouter()

  function handleLocaleChange(newLocale) {
    const newPathname = pathname.replace(/^\/(en|fr|ar)/, `/${newLocale}`)
    router.push(newPathname)
    setIsOpen(false) // close menu after selecting language
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

            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuItem
                className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('en')}
              >
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('fr')}
              >
                {t('french')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
                onSelect={() => handleLocaleChange('ar')}
              >
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
