import { redirect } from 'next/navigation';
import { UI_FEATURES } from '@/services/featureFlags';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (!UI_FEATURES.auth) {
    redirect('/library');
  }
  return children;
}
