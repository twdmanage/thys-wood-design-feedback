
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    shareYourFeedback: "Share Your Feedback",
    valuableInput: "Your valuable input helps us to improve our products.",
    
    // Form fields
    yourFullName: "Your Full Name (optional)",
    enterYourFullName: "Enter your full name",
    productName: "Product Name *",
    productPlaceholder: "e.g. Forest Pendant",
    woodType: "Wood Type *",
    woodTypePlaceholder: "e.g. Oak, Maple, Walnut",
    whyChooseProducts: "Why did you choose our products? *",
    giftForSomeone: "This is a gift for someone special",
    spoilingMyself: "I am spoiling myself",
    howImprove: "How can we improve our products? (optional)",
    improvementPlaceholder: "Share your suggestions for improvement (optional)",
    email: "Email (optional)",
    emailPlaceholder: "your@email.com",
    newsletter: "Keep me updated about new products and special offers",
    
    // Buttons and actions
    submitFeedback: "Submit Feedback",
    submitting: "Submitting...",
    selectRating: "Please select a rating",
    ratingDescription: "Please let us know how you rate our product.",
    
    // Toast messages
    thankYou: "Thank you for your feedback!",
    appreciateInput: "We really appreciate your input.",
    errorSubmitting: "Error submitting feedback",
    tryAgainLater: "Please try again later.",
  },
  es: {
    // Header
    shareYourFeedback: "Comparte tu Opinión",
    valuableInput: "Tu valiosa opinión nos ayuda a mejorar nuestros productos.",
    
    // Form fields
    yourFullName: "Tu Nombre Completo (opcional)",
    enterYourFullName: "Ingresa tu nombre completo",
    productName: "Nombre del Producto *",
    productPlaceholder: "ej. Colgante del Bosque",
    woodType: "Tipo de Madera *",
    woodTypePlaceholder: "ej. Roble, Arce, Nogal",
    whyChooseProducts: "¿Por qué elegiste nuestros productos? *",
    giftForSomeone: "Es un regalo para alguien especial",
    spoilingMyself: "Me estoy dando un capricho",
    howImprove: "¿Cómo podemos mejorar nuestros productos? (opcional)",
    improvementPlaceholder: "Comparte tus sugerencias de mejora (opcional)",
    email: "Correo Electrónico (opcional)",
    emailPlaceholder: "tu@correo.com",
    newsletter: "Manténme informado sobre nuevos productos y ofertas especiales",
    
    // Buttons and actions
    submitFeedback: "Enviar Opinión",
    submitting: "Enviando...",
    selectRating: "Por favor selecciona una calificación",
    ratingDescription: "Por favor dinos cómo calificas nuestro producto.",
    
    // Toast messages
    thankYou: "¡Gracias por tu opinión!",
    appreciateInput: "Realmente apreciamos tu aportación.",
    errorSubmitting: "Error al enviar la opinión",
    tryAgainLater: "Por favor intenta de nuevo más tarde.",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
