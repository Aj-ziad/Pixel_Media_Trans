import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale
});

export const config = {
  matcher: [
    // Match all paths except for API routes, _next/static, _next/image, favicon
    '/((?!api|_next|.*\\..*).*)'
  ]
};
