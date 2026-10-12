import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { UI_FEATURES } from '@/services/featureFlags';
import LinkDevice from './LinkDevice';

export default function Page() {
  if (!UI_FEATURES.auth) {
    redirect('/library');
  }
  // The client child reads the code with useSearchParams, which Next 16
  // requires to be wrapped in Suspense.
  return (
    <Suspense fallback={null}>
      <LinkDevice />
    </Suspense>
  );
}
