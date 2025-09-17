'use client'
import Image from 'next/image';
import Link from 'next/link';


const WhatsAppIcon = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      animation: 'bounce 2s infinite',
    }}>
      <Link href="https://wa.me/0669909179 "  target="_blank" rel="noopener noreferrer">
        <Image src="/whatsapp-icon.png" alt="WhatsApp" width={80} height={80} />
      </Link>
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppIcon;