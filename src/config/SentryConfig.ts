import * as Sentry from '@sentry/react-native';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://5bd730044f5f4d75bf2c36e89543aeac@o296768.ingest.sentry.io/5207255',
  });
}
