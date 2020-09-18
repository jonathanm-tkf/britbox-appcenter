import * as Sentry from '@sentry/react-native';
import { getBuildNumber, getBundleId, getVersion } from 'react-native-device-info';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://5bd730044f5f4d75bf2c36e89543aeac@o296768.ingest.sentry.io/5207255',
    dist: getBuildNumber(),
    release: `${getBundleId()}-${getVersion()}`,
  });
}
