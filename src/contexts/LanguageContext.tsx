
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'de' | 'fr' | 'it' | 'pt' | 'nl';

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
  de: {
    // Header
    shareYourFeedback: "Teilen Sie Ihr Feedback",
    valuableInput: "Ihr wertvolles Feedback hilft uns, unsere Produkte zu verbessern.",
    
    // Form fields
    yourFullName: "Ihr vollständiger Name (optional)",
    enterYourFullName: "Geben Sie Ihren vollständigen Namen ein",
    productName: "Produktname *",
    productPlaceholder: "z.B. Waldanhänger",
    woodType: "Holzart *",
    woodTypePlaceholder: "z.B. Eiche, Ahorn, Nussbaum",
    whyChooseProducts: "Warum haben Sie sich für unsere Produkte entschieden? *",
    giftForSomeone: "Das ist ein Geschenk für jemand Besonderen",
    spoilingMyself: "Ich verwöhne mich selbst",
    howImprove: "Wie können wir unsere Produkte verbessern? (optional)",
    improvementPlaceholder: "Teilen Sie Ihre Verbesserungsvorschläge mit (optional)",
    email: "E-Mail (optional)",
    emailPlaceholder: "ihre@email.de",
    newsletter: "Halten Sie mich über neue Produkte und Sonderangebote auf dem Laufenden",
    
    // Buttons and actions
    submitFeedback: "Feedback senden",
    submitting: "Wird gesendet...",
    selectRating: "Bitte wählen Sie eine Bewertung",
    ratingDescription: "Bitte teilen Sie uns mit, wie Sie unser Produkt bewerten.",
    
    // Toast messages
    thankYou: "Vielen Dank für Ihr Feedback!",
    appreciateInput: "Wir schätzen Ihre Eingabe sehr.",
    errorSubmitting: "Fehler beim Senden des Feedbacks",
    tryAgainLater: "Bitte versuchen Sie es später erneut.",
  },
  fr: {
    // Header
    shareYourFeedback: "Partagez vos Commentaires",
    valuableInput: "Vos précieux commentaires nous aident à améliorer nos produits.",
    
    // Form fields
    yourFullName: "Votre nom complet (optionnel)",
    enterYourFullName: "Entrez votre nom complet",
    productName: "Nom du produit *",
    productPlaceholder: "ex. Pendentif Forêt",
    woodType: "Type de bois *",
    woodTypePlaceholder: "ex. Chêne, Érable, Noyer",
    whyChooseProducts: "Pourquoi avez-vous choisi nos produits ? *",
    giftForSomeone: "C'est un cadeau pour quelqu'un de spécial",
    spoilingMyself: "Je me fais plaisir",
    howImprove: "Comment pouvons-nous améliorer nos produits ? (optionnel)",
    improvementPlaceholder: "Partagez vos suggestions d'amélioration (optionnel)",
    email: "E-mail (optionnel)",
    emailPlaceholder: "votre@email.fr",
    newsletter: "Tenez-moi informé des nouveaux produits et offres spéciales",
    
    // Buttons and actions
    submitFeedback: "Envoyer les commentaires",
    submitting: "Envoi en cours...",
    selectRating: "Veuillez sélectionner une note",
    ratingDescription: "Veuillez nous dire comment vous évaluez notre produit.",
    
    // Toast messages
    thankYou: "Merci pour vos commentaires !",
    appreciateInput: "Nous apprécions vraiment votre contribution.",
    errorSubmitting: "Erreur lors de l'envoi des commentaires",
    tryAgainLater: "Veuillez réessayer plus tard.",
  },
  it: {
    // Header
    shareYourFeedback: "Condividi il tuo Feedback",
    valuableInput: "Il tuo prezioso feedback ci aiuta a migliorare i nostri prodotti.",
    
    // Form fields
    yourFullName: "Il tuo nome completo (opzionale)",
    enterYourFullName: "Inserisci il tuo nome completo",
    productName: "Nome del prodotto *",
    productPlaceholder: "es. Ciondolo Foresta",
    woodType: "Tipo di legno *",
    woodTypePlaceholder: "es. Quercia, Acero, Noce",
    whyChooseProducts: "Perché hai scelto i nostri prodotti? *",
    giftForSomeone: "È un regalo per qualcuno di speciale",
    spoilingMyself: "Mi sto viziando",
    howImprove: "Come possiamo migliorare i nostri prodotti? (opzionale)",
    improvementPlaceholder: "Condividi i tuoi suggerimenti per il miglioramento (opzionale)",
    email: "Email (opzionale)",
    emailPlaceholder: "tua@email.it",
    newsletter: "Tienimi aggiornato su nuovi prodotti e offerte speciali",
    
    // Buttons and actions
    submitFeedback: "Invia Feedback",
    submitting: "Invio in corso...",
    selectRating: "Seleziona una valutazione",
    ratingDescription: "Dicci come valuti il nostro prodotto.",
    
    // Toast messages
    thankYou: "Grazie per il tuo feedback!",
    appreciateInput: "Apprezziamo molto il tuo contributo.",
    errorSubmitting: "Errore nell'invio del feedback",
    tryAgainLater: "Riprova più tardi.",
  },
  pt: {
    // Header
    shareYourFeedback: "Compartilhe seu Feedback",
    valuableInput: "Seu valioso feedback nos ajuda a melhorar nossos produtos.",
    
    // Form fields
    yourFullName: "Seu nome completo (opcional)",
    enterYourFullName: "Digite seu nome completo",
    productName: "Nome do produto *",
    productPlaceholder: "ex. Pingente Floresta",
    woodType: "Tipo de madeira *",
    woodTypePlaceholder: "ex. Carvalho, Bordo, Nogueira",
    whyChooseProducts: "Por que você escolheu nossos produtos? *",
    giftForSomeone: "É um presente para alguém especial",
    spoilingMyself: "Estou me mimando",
    howImprove: "Como podemos melhorar nossos produtos? (opcional)",
    improvementPlaceholder: "Compartilhe suas sugestões de melhoria (opcional)",
    email: "Email (opcional)",
    emailPlaceholder: "seu@email.com.br",
    newsletter: "Mantenha-me atualizado sobre novos produtos e ofertas especiais",
    
    // Buttons and actions
    submitFeedback: "Enviar Feedback",
    submitting: "Enviando...",
    selectRating: "Selecione uma avaliação",
    ratingDescription: "Diga-nos como você avalia nosso produto.",
    
    // Toast messages
    thankYou: "Obrigado pelo seu feedback!",
    appreciateInput: "Realmente apreciamos sua contribuição.",
    errorSubmitting: "Erro ao enviar feedback",
    tryAgainLater: "Tente novamente mais tarde.",
  },
  nl: {
    // Header
    shareYourFeedback: "Deel uw Feedback",
    valuableInput: "Uw waardevolle feedback helpt ons onze producten te verbeteren.",
    
    // Form fields
    yourFullName: "Uw volledige naam (optioneel)",
    enterYourFullName: "Voer uw volledige naam in",
    productName: "Productnaam *",
    productPlaceholder: "bijv. Bos Hanger",
    woodType: "Houtsoort *",
    woodTypePlaceholder: "bijv. Eik, Esdoorn, Walnoot",
    whyChooseProducts: "Waarom koos u voor onze producten? *",
    giftForSomeone: "Dit is een cadeau voor iemand speciaal",
    spoilingMyself: "Ik verwen mezelf",
    howImprove: "Hoe kunnen we onze producten verbeteren? (optioneel)",
    improvementPlaceholder: "Deel uw suggesties voor verbetering (optioneel)",
    email: "E-mail (optioneel)",
    emailPlaceholder: "uw@email.nl",
    newsletter: "Houd me op de hoogte van nieuwe producten en speciale aanbiedingen",
    
    // Buttons and actions
    submitFeedback: "Feedback verzenden",
    submitting: "Verzenden...",
    selectRating: "Selecteer een beoordeling",
    ratingDescription: "Laat ons weten hoe u ons product beoordeelt.",
    
    // Toast messages
    thankYou: "Bedankt voor uw feedback!",
    appreciateInput: "We waarderen uw input zeer.",
    errorSubmitting: "Fout bij het verzenden van feedback",
    tryAgainLater: "Probeer het later opnieuw.",
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
