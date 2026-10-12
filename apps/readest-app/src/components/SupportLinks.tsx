import { useTranslation } from '@/hooks/useTranslation';
import Link from './Link';

const ASHAMPOO_LINK = 'https://linktarget.ashampoo.com/linktarget?product=10130&edition=eid=47911';

const SupportLinks = () => {
  const _ = useTranslation();

  return (
    <div className='my-2 flex flex-col items-center gap-2'>
      <p className='text-neutral-content text-sm'>{_('Get Help')}</p>
      <div className='flex flex-wrap justify-center gap-4 text-sm sm:text-xs'>
        <Link
          href={`${ASHAMPOO_LINK}&target=support`}
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_('Support')}
        </Link>
        <Link
          href={`${ASHAMPOO_LINK}&target=manual`}
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_('Manual')}
        </Link>
        <Link
          href={`${ASHAMPOO_LINK}&target=whatsnew`}
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_("What's New")}
        </Link>
      </div>
    </div>
  );
};

export default SupportLinks;
