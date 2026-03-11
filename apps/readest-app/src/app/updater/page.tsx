'use client';

import { Suspense } from 'react';
import { UpdaterContent } from '@/components/UpdaterWindow';
import { useTheme } from '@/hooks/useTheme';
import Spinner from '@/components/Spinner';
import { UI_FEATURES } from '@/services/constants';

const UpdaterPage = () => {
  useTheme();

  if (!UI_FEATURES.updater) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <Spinner loading />
        </div>
      }
    >
      <div className='bg-base-100 px-12 py-4'>
        <UpdaterContent />
      </div>
    </Suspense>
  );
};

export default UpdaterPage;
