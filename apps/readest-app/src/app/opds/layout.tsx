import { redirect } from 'next/navigation';
import { UI_FEATURES } from '@/services/featureFlags';

export default function OPDSLayout({ children }: { children: React.ReactNode }) {
  if (!UI_FEATURES.opds) {
    redirect('/library');
  }
  return children;
}
