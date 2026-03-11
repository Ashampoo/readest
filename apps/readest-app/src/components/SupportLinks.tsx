import { useTranslation } from '@/hooks/useTranslation';
import Link from './Link';

const SupportLinks = () => {
  const _ = useTranslation();

  return (
    <div className='my-2 flex flex-col items-center gap-2'>
      <p className='text-neutral-content text-sm'>{_('Get Help')}</p>
      <div className='flex flex-wrap justify-center gap-4 text-sm sm:text-xs'>
        <Link
          href='https://linktarget.ashampoo.com/linktarget?product=10130&target=support&edition=eid=47911'
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_('Support')}
        </Link>
        <Link
          href='https://linktarget.ashampoo.com/linktarget?product=10130&target=homepage&edition=eid=47911'
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_('Homepage')}
        </Link>
        <Link
          href='https://linktarget.ashampoo.com/linktarget?product=10130&target=feedback&edition=eid=47911'
          className='text-blue-500 underline hover:text-blue-600'
        >
          {_('Feedback')}
        </Link>
      </div>
    </div>
  );
};

export default SupportLinks;
