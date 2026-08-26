import { makeLegalPage } from '@/lib/legalPage';

const page = makeLegalPage('CookiePolicy', '/cookies');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
