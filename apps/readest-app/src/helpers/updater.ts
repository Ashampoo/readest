import semver from 'semver';
import { TranslationFunc } from '@/hooks/useTranslation';
import { setUpdaterWindowVisible } from '@/components/UpdaterWindow';
import { isTauriAppPlatform } from '@/services/environment';
import { getAppVersion } from '@/utils/version';
import {
  CHECK_UPDATE_INTERVAL_SEC,
  READEST_CHANGELOG_FILE,
  READEST_UPDATER_FILE,
  UI_FEATURES,
} from '@/services/constants';

const LAST_CHECK_KEY = 'lastAppUpdateCheck';

type TauriUpdaterDeps = {
  check: typeof import('@tauri-apps/plugin-updater').check;
  osType: typeof import('@tauri-apps/plugin-os').type;
  tauriFetch: typeof import('@tauri-apps/plugin-http').fetch;
  WebviewWindow: typeof import('@tauri-apps/api/webviewWindow').WebviewWindow;
};

let tauriDepsPromise: Promise<TauriUpdaterDeps> | null = null;
const loadTauriDeps = () => {
  if (!tauriDepsPromise) {
    tauriDepsPromise = Promise.all([
      import('@tauri-apps/plugin-updater'),
      import('@tauri-apps/plugin-os'),
      import('@tauri-apps/plugin-http'),
      import('@tauri-apps/api/webviewWindow'),
    ]).then(([updater, os, http, webview]) => ({
      check: updater.check,
      osType: os.type,
      tauriFetch: http.fetch,
      WebviewWindow: webview.WebviewWindow,
    }));
  }
  return tauriDepsPromise;
};

const showUpdateWindow = async (latestVersion: string) => {
  const { WebviewWindow } = await loadTauriDeps();
  const win = new WebviewWindow('updater', {
    url: `/updater?latestVersion=${latestVersion}`,
    title: 'Software Update',
    width: 626,
    height: 406,
    center: true,
    resizable: true,
  });
  win.once('tauri://created', () => {
    console.log('new window created');
  });
  win.once('tauri://error', (e) => {
    console.error('error creating window', e);
  });
};

export const checkForAppUpdates = async (
  _: TranslationFunc,
  isAutoCheck = true,
): Promise<boolean> => {
  if (!UI_FEATURES.updater || !isTauriAppPlatform()) return false;
  const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
  const now = Date.now();
  if (isAutoCheck && lastCheck && now - parseInt(lastCheck, 10) < CHECK_UPDATE_INTERVAL_SEC * 1000)
    return false;
  localStorage.setItem(LAST_CHECK_KEY, now.toString());

  console.log('Checking for updates');
  const { check, osType, tauriFetch } = await loadTauriDeps();
  const OS_TYPE = osType();
  if (['macos', 'windows', 'linux'].includes(OS_TYPE)) {
    const update = await check();
    if (update) {
      await showUpdateWindow(update.version);
    }
    return !!update;
  } else if (OS_TYPE === 'android') {
    try {
      const response = await tauriFetch(READEST_UPDATER_FILE, { connectTimeout: 5000 });
      const data = await response.json();
      const isNewer = semver.gt(data.version, getAppVersion());
      if (isNewer && ('android-arm64' in data.platforms || 'android-universal' in data.platforms)) {
        setUpdaterWindowVisible(true, data.version!, getAppVersion());
      }
      return isNewer;
    } catch (err) {
      console.warn('Failed to fetch Android update info', err);
      throw new Error('Failed to fetch Android update info');
    }
  }

  return false;
};

const LAST_SHOWN_RELEASE_NOTES_KEY = 'lastShownReleaseNotesVersion';

export const setLastShownReleaseNotesVersion = (version: string) => {
  localStorage.setItem(LAST_SHOWN_RELEASE_NOTES_KEY, version);
};

export const getLastShownReleaseNotesVersion = () => {
  return localStorage.getItem(LAST_SHOWN_RELEASE_NOTES_KEY) || '';
};

export const checkAppReleaseNotes = async (isAutoCheck = true) => {
  if (!UI_FEATURES.updater) return false;
  const currentVersion = getAppVersion();
  const lastShownVersion = getLastShownReleaseNotesVersion();
  if ((lastShownVersion && semver.gt(currentVersion, lastShownVersion)) || !isAutoCheck) {
    try {
      const fetchFunc = isTauriAppPlatform()
        ? (await loadTauriDeps()).tauriFetch
        : window.fetch;
      const res = await fetchFunc(READEST_CHANGELOG_FILE);
      if (res.ok) {
        setUpdaterWindowVisible(true, currentVersion, lastShownVersion, false);
        return true;
      }
    } catch (err) {
      console.warn('Failed to fetch release notes', err);
    }
  } else if (!lastShownVersion) {
    setLastShownReleaseNotesVersion(currentVersion);
  }
  return false;
};
