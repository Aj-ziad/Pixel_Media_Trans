'use client'
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppIcon = () => {
  return (
    <div className="fixed bottom-5 right-5 z-[1000] animate-bounce">
      <Link href="https://wa.me/0669909179" target="_blank" rel="noopener noreferrer">
        <Image src="/whatsapp-icon.png" alt="WhatsApp" width={80} height={80} />
      </Link>
    </div>
  );
};

export default WhatsAppIcon;