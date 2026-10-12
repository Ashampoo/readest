/**
 * Product switches for the Ashampoo fork. Every flag is off: the matching
 * upstream feature stays hidden and its background work does not run.
 * Do not flip these to make a screen or a test pass.
 */
export const UI_FEATURES = {
  translation: false,
  auth: false,
  telemetry: false,
  metadataAutoRetrieve: false,
  kosync: false,
  updater: false,
  opds: false,
  dictionary: false,
  wikipedia: false,
} as const;

export type UIFeature = keyof typeof UI_FEATURES;
