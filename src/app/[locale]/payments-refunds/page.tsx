import { makeLegalPage } from '@/lib/legalPage';

const page = makeLegalPage('PaymentsRefunds', '/payments-refunds');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
