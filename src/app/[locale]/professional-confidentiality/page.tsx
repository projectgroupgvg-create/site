import { makeLegalPage } from '@/lib/legalPage';

const page = makeLegalPage('ProfessionalConfidentiality', '/professional-confidentiality');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
