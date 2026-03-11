import posthog from 'posthog-js';
import { UI_FEATURES } from '@/services/constants';

export const TELEMETRY_OPT_OUT_KEY = 'readest-telemetry-opt-out';

export const hasOptedOutTelemetry = () => {
  if (!UI_FEATURES.telemetry) return true;
  return localStorage.getItem(TELEMETRY_OPT_OUT_KEY) === 'true';
};

export const captureEvent = (event: string, properties?: Record<string, unknown>) => {
  if (!UI_FEATURES.telemetry) return;
  if (!hasOptedOutTelemetry()) {
    posthog.capture(event, properties);
  }
};

export const optInTelemetry = () => {
  if (!UI_FEATURES.telemetry) return;
  localStorage.setItem(TELEMETRY_OPT_OUT_KEY, 'false');
  posthog.opt_in_capturing();
};
export const optOutTelemetry = () => {
  localStorage.setItem(TELEMETRY_OPT_OUT_KEY, 'true');
  if (!UI_FEATURES.telemetry) return;
  posthog.opt_out_capturing();
};
