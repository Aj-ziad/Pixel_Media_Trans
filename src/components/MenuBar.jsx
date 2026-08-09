'use client'
import { navLinks } from '@/constants/nav-links'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import React from 'react'
import MobileNav from './MobileNav'
import { useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Languages } from 'lucide-react'

const MenuBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('navbar') // translation namespace

  function handleLocaleChange(newLocale) {
    router.push(pathname, { locale: newLocale })
  }

  return (
    <header className="fixed top-6 left-0 w-full flex justify-center z-30">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center bg-white bg-opacity-90 backdrop-blur-md rounded-full px-12 py-3 shadow-lg">
        <nav className="flex gap-10 items-center">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (pathname === '/' && link.href.includes('#')) {
                    e.preventDefault();
                    const targetId = link.href.split('#')[1];
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`relative text-sm font-semibold transition-colors duration-300 
                  ${isActive ? 'text-[#ffb900]' : 'text-gray-700 hover:text-black'}`}
              >
                {t(link.key)}
                <span
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[3px] rounded-full transition-all duration-300
                    ${isActive ? 'w-6 bg-gradient-to-r from-orange-400 to-[#ffb900]' : 'w-0'}`}
                />
              </Link>
            )
          })}

         <DropdownMenu>
  <DropdownMenuTrigger asChild >
    <button className="text-sm font-semibold hover:text-black px-3 py-1 cursor-pointer text-[#ffb900] rounded">
      <Languages />
    </button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="start" className="w-32 bg-white/90 ">
    <DropdownMenuItem
      className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]"
      onSelect={() => handleLocaleChange('en')}
      
    >
       <img src="/flags/en.png" alt="English" className="w-5 h-5 rounded-sm" />
      {t('english')}
    </DropdownMenuItem>
    <DropdownMenuItem
      className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900] "
      onSelect={() => handleLocaleChange('fr')}
    >
      <img src="/flags/fr.png" alt="Français" className="w-5 h-5 rounded-sm" />
       {t('french')}
    </DropdownMenuItem>
    <DropdownMenuItem
      className="cursor-pointer py-2 px-4 rounded-lg text-black data-[highlighted]:bg-[#ffb900]  "
      onSelect={() => handleLocaleChange('ar')}
    >
      <img src="/flags/ar.png" alt="العربية" className="w-5 h-5 rounded-sm" />
       {t('arabic')}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center bg-white bg-opacity-90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
        <MobileNav />
      </div>
    </header>
  )
}

export default MenuBar