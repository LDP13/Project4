import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5 text-blue-500" />
      <span className="font-medium text-blue-700">
        {i18n.language === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
}