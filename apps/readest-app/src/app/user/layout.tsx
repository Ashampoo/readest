import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { UI_FEATURES } from '@/services/featureFlags';

export const metadata: Metadata = {
  title: 'Account & Sign In',
  description:
    'Sign in to your Readest account or manage your subscription, cloud library storage, and account settings.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  if (!UI_FEATURES.auth) {
    redirect('/library');
  }
  return <>{children}</>;
}
