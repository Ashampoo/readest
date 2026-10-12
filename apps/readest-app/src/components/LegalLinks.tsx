import { useTranslation } from '@/hooks/useTranslation';
import Link from './Link';

const ASHAMPOO_LINK = 'https://linktarget.ashampoo.com/linktarget?product=10130&edition=eid=47911';

const LegalLinks = () => {
  const _ = useTranslation();

  return (
    <div className='my-2 flex flex-wrap justify-center gap-4 text-sm sm:text-xs'>
      <Link
        href={`${ASHAMPOO_LINK}&target=privacypolicy`}
        className='text-blue-500 underline hover:text-blue-600'
      >
        {_('Privacy Policy')}
      </Link>
      <Link
        href={`${ASHAMPOO_LINK}&target=eula`}
        className='text-blue-500 underline hover:text-blue-600'
      >
        {_('EULA')}
      </Link>
    </div>
  );
};

export default LegalLinks;
