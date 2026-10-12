import { redirect } from 'next/navigation';
import { UI_FEATURES } from '@/services/featureFlags';

export default function UpdaterLayout({ children }: { children: React.ReactNode }) {
  if (!UI_FEATURES.updater) {
    redirect('/library');
  }
  return children;
}
