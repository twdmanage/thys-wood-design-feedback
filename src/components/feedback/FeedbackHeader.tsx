
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const FeedbackHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>
      <img
        src="https://res.cloudinary.com/dlsjdyti8/image/upload/v1745065446/2023-10-16_TWD_Logo_Brown_j64mn0.png"
        alt="Thys Wood Design Logo"
        className="mx-auto h-24 mb-4"
      />
      <h1 className="text-3xl font-semibold mb-2">{t('shareYourFeedback')}</h1>
      <p className="text-muted-foreground">
        {t('valuableInput')}
      </p>
    </div>
  );
};

export default FeedbackHeader;
