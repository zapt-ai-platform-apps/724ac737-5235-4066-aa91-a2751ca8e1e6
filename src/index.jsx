import { render } from 'solid-js/web';
import App from './App';
import './index.css';

import { Router } from '@solidjs/router';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

// Add PWA support to the app (this will add a service worker and a manifest file)
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/updated-icon.png?width=512&height=512",
  name: "منشئ المواقع الاحترافية",
  shortName: "منشئ المواقع"
};

let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));