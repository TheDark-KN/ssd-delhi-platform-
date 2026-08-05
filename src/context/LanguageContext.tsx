"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header/Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.organization": "Overview",
    "nav.ambedkar": "Dr. Ambedkar",
    "nav.history": "History",
    "nav.content": "Library",
    "nav.ideology": "Ideology",
    "nav.structure": "Structure",
    "nav.articles": "Articles",
    "nav.blogs": "Blogs",
    "nav.news": "News",
    "nav.events": "Events",
    "nav.gallery": "Gallery",
    "nav.join": "Join SSD",
    "nav.nationalExecutive": "National Executive",
    "nav.rankStructure": "Rank Structure",
    "nav.contact": "Contact",
    "nav.dashboard": "Dashboard",
    "nav.admin": "Admin",
    "nav.signIn": "Sign In",
    "nav.signUp": "Sign Up",
    "nav.profile": "Profile",
    "nav.membershipCard": "Membership Card",
    "nav.logout": "Logout",
    
    // National Executive
    "nationalExecutive.title": "National Executive",
    "nationalExecutive.subtitle": "Office Bearers List",
    "nationalExecutive.description": "National-level office bearers of Samta Sainik Dal. Each card has space reserved for adding photos.",
    "nationalExecutive.searchPlaceholder": "Search name, designation or state…",
    "nationalExecutive.clearSearch": "Clear search",
    "nationalExecutive.allStates": "All States",
    "nationalExecutive.loading": "Loading officers…",
    "nationalExecutive.noResults": "No officers found.",
    "nationalExecutive.officersCount": "Officers",
    "nationalExecutive.designation.nationalPresident": "National President",
    "nationalExecutive.designation.nationalGeneralSecretary": "National General Secretary",
    "nationalExecutive.designation.nationalTreasurer": "National Treasurer",
    "nationalExecutive.designation.nationalVicePresident": "National Vice President",
    "nationalExecutive.designation.nationalSecretary": "National Secretary",
    "nationalExecutive.designation.nationalJointSecretary": "National Joint Secretary",
    "nationalExecutive.footer": "Samta Sainik Dal • National Executive",
    
    // States
    "state.uttarPradesh": "Uttar Pradesh",
    "state.delhi": "Delhi",
    "state.rajasthan": "Rajasthan",
    "state.himachalPradesh": "Himachal Pradesh",
    "state.madhyaPradesh": "Madhya Pradesh",
    "state.gujarat": "Gujarat",
    "state.bihar": "Bihar",
    "state.madhyaPradeshChhattisgarh": "Madhya Pradesh/Chhattisgarh",
    
    // Footer
    "footer.brand": "SSD Delhi",
    "footer.tagline": "Soldiers for Equality — Building a Casteless Society",
    "footer.founded": "Founded by Dr. B.R. Ambedkar in 1924",
    "footer.organization": "Organization",
    "footer.content": "Content",
    "footer.community": "Community",
    "footer.support": "Support",
    "footer.about": "About Us",
    "footer.history": "History",
    "footer.ideology": "Ideology",
    "footer.structure": "Structure",
    "footer.articles": "Articles",
    "footer.blogs": "Blogs",
    "footer.news": "News",
    "footer.events": "Events",
    "footer.gallery": "Gallery",
    "footer.join": "Join SSD",
    "footer.membership": "Membership",
    "footer.volunteer": "Volunteer",
    "footer.donate": "Donate",
    "footer.contact": "Contact",
    "footer.faq": "FAQ",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "© {year} Samta Sainik Dal Delhi. All rights reserved.",
    "footer.address": "Samta Sainik Dal Delhi, New Delhi, India",
    "footer.email": "info@ssddelhi.org",
    "footer.phone": "+91 11 1234 5678",
    
    // Home page
    "home.hero.title": "Samta Sainik Dal Delhi",
    "home.hero.subtitle": "Soldiers for Equality",
    "home.hero.description": "Founded by Dr. B.R. Ambedkar in 1924 to defend the rights and dignity of India's oppressed communities.",
    "home.hero.joinBtn": "Join Us",
    "home.hero.learnMore": "Learn More",
    "home.stats.members": "Active Members",
    "home.stats.events": "Events Organized",
    "home.stats.states": "State Units",
    "home.stats.years": "Years of Service",
    
    // Common
    "common.readMore": "Read More",
    "common.viewAll": "View All",
    "common.loading": "Loading…",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.language": "Language",
    "common.english": "English",
    "common.hindi": "हिंदी",
    
    // Contact page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with Samta Sainik Dal Delhi",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.address": "Our Address",
    "contact.officeHours": "Office Hours",
    "contact.monFri": "Monday - Friday: 9:00 AM - 6:00 PM",
    "contact.sat": "Saturday: 10:00 AM - 4:00 PM",
    "contact.sun": "Sunday: Closed",
    
    // Join page
    "join.title": "Join Samta Sainik Dal",
    "join.subtitle": "Become a soldier for equality",
    "join.eligibility": "Eligibility",
    "join.eligibility.desc": "Believe in equality, Ambedkarite principles, willing to follow discipline.",
    "join.steps": "Steps to Join",
    "join.step1": "Visit Dr. Ambedkar Bhawan during programs",
    "join.step2": "Fill membership form & take oath",
    "join.step3": "Attend orientation",
    "join.step4": "Choose your volunteer path",
    "join.contact": "Contact national office for verification",
    
    // Events
    "events.title": "Events",
    "events.upcoming": "Upcoming Events",
    "events.past": "Past Events",
    "events.register": "Register",
    "events.venue": "Venue",
    "events.date": "Date",
    "events.time": "Time",
    "events.category": "Category",
    
    // Articles/Blogs
    "article.publishedOn": "Published on",
    "article.by": "By",
    "article.category": "Category",
    "article.tags": "Tags",
    "article.share": "Share",
    "article.related": "Related Articles",
    
    // Login/Auth
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.rememberMe": "Remember me",
    "auth.forgotPassword": "Forgot password?",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.name": "Full Name",
    "auth.confirmPassword": "Confirm Password",
    
    // Membership
    "membership.title": "Membership",
    "membership.status": "Status",
    "membership.number": "Membership Number",
    "membership.since": "Member Since",
    "membership.active": "Active",
    "membership.pending": "Pending",
    "membership.expired": "Expired",
    "membership.renew": "Renew Membership",
    "membership.card": "Membership Card",
    "membership.downloadCard": "Download Card",
    
    // Rank Structure
    "rank.title": "Rank Structure",
    "rank.national": "National Level",
    "rank.state": "State Level",
    "rank.district": "District Level",
    "rank.local": "Local Unit Level",
    
    // Admin
    "admin.dashboard": "Admin Dashboard",
    "admin.articles": "Manage Articles",
    "admin.members": "Manage Members",
    "admin.events": "Manage Events",
    "admin.news": "Manage News",
    "admin.create": "Create New",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.publish": "Publish",
    "admin.unpublish": "Unpublish",
  },
  hi: {
    // Header/Navigation
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.organization": "अवलोकन",
    "nav.ambedkar": "डॉ. अम्बेडकर",
    "nav.history": "इतिहास",
    "nav.content": "लाइब्रेरी",
    "nav.ideology": "विचारधारा",
    "nav.structure": "संरचना",
    "nav.articles": "लेख",
    "nav.blogs": "ब्लॉग",
    "nav.news": "समाचार",
    "nav.events": "कार्यक्रम",
    "nav.gallery": "गैलरी",
    "nav.join": "एसएसडी में शामिल हों",
    "nav.nationalExecutive": "राष्ट्रीय कार्यकारिणी",
    "nav.rankStructure": "पद संरचना",
    "nav.contact": "संपर्क",
    "nav.dashboard": "डैशबोर्ड",
    "nav.admin": "एडमिन",
    "nav.signIn": "साइन इन",
    "nav.signUp": "साइन अप",
    "nav.profile": "प्रोफाइल",
    "nav.membershipCard": "सदस्यता कार्ड",
    "nav.logout": "लॉगआउट",
    
    // National Executive
    "nationalExecutive.title": "राष्ट्रीय कार्यकारिणी",
    "nationalExecutive.subtitle": "पदाधिकारी सूची",
    "nationalExecutive.description": "समता सैनिक दल के राष्ट्रीय स्तर के पदाधिकारी। प्रत्येक कार्ड में फोटो जोड़ने के लिए स्थान रखा गया है।",
    "nationalExecutive.searchPlaceholder": "नाम, पद या राज्य खोजें…",
    "nationalExecutive.clearSearch": "खोज साफ करें",
    "nationalExecutive.allStates": "सभी राज्य",
    "nationalExecutive.loading": "पदाधिकारी लोड हो रहे हैं…",
    "nationalExecutive.noResults": "कोई पदाधिकारी नहीं मिला।",
    "nationalExecutive.officersCount": "पदाधिकारी",
    "nationalExecutive.designation.nationalPresident": "राष्ट्रीय अध्यक्ष",
    "nationalExecutive.designation.nationalGeneralSecretary": "राष्ट्रीय प्रधान महासचिव",
    "nationalExecutive.designation.nationalTreasurer": "राष्ट्रीय कोषाध्यक्ष",
    "nationalExecutive.designation.nationalVicePresident": "राष्ट्रीय उपाध्यक्ष",
    "nationalExecutive.designation.nationalSecretary": "राष्ट्रीय महासचिव",
    "nationalExecutive.designation.nationalJointSecretary": "राष्ट्रीय सचिव",
    "nationalExecutive.footer": "समता सैनिक दल • राष्ट्रीय कार्यकारिणी",
    
    // States
    "state.uttarPradesh": "उत्तर प्रदेश",
    "state.delhi": "दिल्ली",
    "state.rajasthan": "राजस्थान",
    "state.himachalPradesh": "हिमाचल प्रदेश",
    "state.madhyaPradesh": "मध्य प्रदेश",
    "state.gujarat": "गुजरात",
    "state.bihar": "बिहार",
    "state.madhyaPradeshChhattisgarh": "म.प्र./छ.ग.",
    
    // Footer
    "footer.brand": "एसएसडी दिल्ली",
    "footer.tagline": "समता के सैनिक — जातिविहीन समाज का निर्माण",
    "footer.founded": "डॉ. बी.आर. अम्बेडकर द्वारा 1924 में स्थापित",
    "footer.organization": "संगठन",
    "footer.content": "सामग्री",
    "footer.community": "समुदाय",
    "footer.support": "सहायता",
    "footer.about": "हमारे बारे में",
    "footer.history": "इतिहास",
    "footer.ideology": "विचारधारा",
    "footer.structure": "संरचना",
    "footer.articles": "लेख",
    "footer.blogs": "ब्लॉग",
    "footer.news": "समाचार",
    "footer.events": "कार्यक्रम",
    "footer.gallery": "गैलरी",
    "footer.join": "एसएसडी में शामिल हों",
    "footer.membership": "सदस्यता",
    "footer.volunteer": "स्वयंसेवक",
    "footer.donate": "दान करें",
    "footer.contact": "संपर्क",
    "footer.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "footer.privacy": "गोपनीयता नीति",
    "footer.terms": "सेवा की शर्तें",
    "footer.copyright": "© {year} समता सैनिक दल दिल्ली। सर्वाधिकार सुरक्षित।",
    "footer.address": "समता सैनिक दल दिल्ली, नई दिल्ली, भारत",
    "footer.email": "info@ssddelhi.org",
    "footer.phone": "+91 11 1234 5678",
    
    // Home page
    "home.hero.title": "समता सैनिक दल दिल्ली",
    "home.hero.subtitle": "समता के सैनिक",
    "home.hero.description": "डॉ. बी.आर. अम्बेडकर द्वारा 1924 में स्थापित, भारत के वंचित समुदायों के अधिकारों और गरिमा की रक्षा के लिए।",
    "home.hero.joinBtn": "हमसे जुड़ें",
    "home.hero.learnMore": "और जानें",
    "home.stats.members": "सक्रिय सदस्य",
    "home.stats.events": "आयोजित कार्यक्रम",
    "home.stats.states": "राज्य इकाइयां",
    "home.stats.years": "सेवा के वर्ष",
    
    // Common
    "common.readMore": "और पढ़ें",
    "common.viewAll": "सभी देखें",
    "common.loading": "लोड हो रहा है…",
    "common.error": "एक त्रुटि हुई",
    "common.retry": "पुनः प्रयास करें",
    "common.submit": "जमा करें",
    "common.cancel": "रद्द करें",
    "common.save": "सेव करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.search": "खोजें",
    "common.filter": "फ़िल्टर",
    "common.language": "भाषा",
    "common.english": "English",
    "common.hindi": "हिंदी",
    
    // Contact page
    "contact.title": "संपर्क करें",
    "contact.subtitle": "समता सैनिक दल दिल्ली से संपर्क करें",
    "contact.name": "नाम",
    "contact.email": "ईमेल",
    "contact.phone": "फोन",
    "contact.message": "संदेश",
    "contact.send": "संदेश भेजें",
    "contact.address": "हमारा पता",
    "contact.officeHours": "कार्यालय समय",
    "contact.monFri": "सोमवार - शुक्रवार: सुबह 9:00 - शाम 6:00",
    "contact.sat": "शनिवार: सुबह 10:00 - शाम 4:00",
    "contact.sun": "रविवार: बंद",
    
    // Join page
    "join.title": "समता सैनिक दल में शामिल हों",
    "join.subtitle": "समता के सैनिक बनें",
    "join.eligibility": "पात्रता",
    "join.eligibility.desc": "समता में विश्वास, अम्बेडकरवादी सिद्धांत, अनुशासन का पालन करने की इच्छा।",
    "join.steps": "शामिल होने के चरण",
    "join.step1": "कार्यक्रमों के दौरान डॉ. अम्बेडकर भवन जाएं",
    "join.step2": "सदस्यता फॉर्म भरें और शपथ लें",
    "join.step3": "ओरिएंटेशन में भाग लें",
    "join.step4": "अपना स्वयंसेवक पथ चुनें",
    "join.contact": "सत्यापन के लिए राष्ट्रीय कार्यालय से संपर्क करें",
    
    // Events
    "events.title": "कार्यक्रम",
    "events.upcoming": "आगामी कार्यक्रम",
    "events.past": "पिछले कार्यक्रम",
    "events.register": "पंजीकरण",
    "events.venue": "स्थान",
    "events.date": "तारीख",
    "events.time": "समय",
    "events.category": "श्रेणी",
    
    // Articles/Blogs
    "article.publishedOn": "प्रकाशित",
    "article.by": "द्वारा",
    "article.category": "श्रेणी",
    "article.tags": "टैग",
    "article.share": "साझा करें",
    "article.related": "संबंधित लेख",
    
    // Login/Auth
    "auth.email": "ईमेल पता",
    "auth.password": "पासवर्ड",
    "auth.rememberMe": "मुझे याद रखें",
    "auth.forgotPassword": "पासवर्ड भूल गए?",
    "auth.signIn": "साइन इन",
    "auth.signUp": "साइन अप",
    "auth.noAccount": "खाता नहीं है?",
    "auth.hasAccount": "पहले से खाता है?",
    "auth.name": "पूरा नाम",
    "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
    
    // Membership
    "membership.title": "सदस्यता",
    "membership.status": "स्थिति",
    "membership.number": "सदस्यता संख्या",
    "membership.since": "सदस्यता प्रारंभ",
    "membership.active": "सक्रिय",
    "membership.pending": "लंबित",
    "membership.expired": "समाप्त",
    "membership.renew": "सदस्यता नवीनीकृत करें",
    "membership.card": "सदस्यता कार्ड",
    "membership.downloadCard": "कार्ड डाउनलोड करें",
    
    // Rank Structure
    "rank.title": "पद संरचना",
    "rank.national": "राष्ट्रीय स्तर",
    "rank.state": "राज्य स्तर",
    "rank.district": "जिला स्तर",
    "rank.local": "स्थानीय इकाई स्तर",
    
    // Admin
    "admin.dashboard": "एडमिन डैशबोर्ड",
    "admin.articles": "लेख प्रबंधित करें",
    "admin.members": "सदस्य प्रबंधित करें",
    "admin.events": "कार्यक्रम प्रबंधित करें",
    "admin.news": "समाचार प्रबंधित करें",
    "admin.create": "नया बनाएं",
    "admin.edit": "संपादित करें",
    "admin.delete": "हटाएं",
    "admin.publish": "प्रकाशित करें",
    "admin.unpublish": "अप्रकाशित करें",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a default context for SSR
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key: string) => translations.en[key] || key,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage: changeLanguage,
    t,
  };

  // Always provide context, even during SSR (with default "en")
  // This prevents "useLanguage must be used within a LanguageProvider" errors
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback for edge cases - should not happen with the fix above
    return defaultContext;
  }
  return context;
}
