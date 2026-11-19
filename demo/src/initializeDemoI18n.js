import i18next from 'i18next';

export default function initializeDemoI18n() {
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          demoApplicationText: 'Demo application translations are intact',
        },
      },
    },
  });
}
