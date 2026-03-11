'use client';

import posthog from 'posthog-js';
import { ReactNode, useEffect } from 'react';
import { PostHogProvider } from 'posthog-js/react';
import { TELEMETRY_OPT_OUT_KEY } from '@/utils/telemetry';
import { getAppVersion } from '@/utils/version';
import { UI_FEATURES } from '@/services/constants';

const shouldDisablePostHog = () => {
  if (typeof window === 'undefined') return false;
  if (!UI_FEATURES.telemetry) return true;
  return localStorage.getItem(TELEMETRY_OPT_OUT_KEY) === 'true';
};

const posthogUrl =
  process.env['NEXT_PUBLIC_POSTHOG_HOST'] ||
  atob(process.env['NEXT_PUBLIC_DEFAULT_POSTHOG_URL_BASE64']!);
const posthogKey =
  process.env['NEXT_PUBLIC_POSTHOG_KEY'] ||
  atob(process.env['NEXT_PUBLIC_DEFAULT_POSTHOG_KEY_BASE64']!);

if (
  typeof window !== 'undefined' &&
  process.env['NODE_ENV'] === 'production' &&
  posthogKey &&
  UI_FEATURES.telemetry
) {
  if (!shouldDisablePostHog()) {
    posthog.init(posthogKey, {
      api_host: posthogUrl,
      person_profiles: 'always',
    });
  }
}
export const CSPostHogProvider = ({ children }: { children: ReactNode }) => {
  if (!UI_FEATURES.telemetry) {
    return <>{children}</>;
  }
  useEffect(() => {
    posthog.register_for_session({
      $app_version: getAppVersion(),
    });
  }, []);
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
