import { makeLegalPage } from '@/lib/legalPage';

const page = makeLegalPage('AiTerms', '/ai-terms');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
