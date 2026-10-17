/**
 * ============================================================================
 *  WEDDING CONFIG — "Aurelia" theme.  EDIT EVERYTHING HERE.
 * ============================================================================
 *  One file drives the whole site: names, dates, venues, photos, colors,
 *  music, copy. Swap images in /public/photos and redeploy.
 * ============================================================================
 */

export type Locale = "en" | "hi";
export type LocalizedText = Record<Locale, string>;

export interface Milestone {
  eyebrow: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  image: string;
}

export interface WeekendEvent {
  id: string;
  name: LocalizedText;
  /** ISO date-time, e.g. "2027-03-19T17:00:00+05:30" */
  datetime: string;
  venue: LocalizedText;
  dressCodeLabel: LocalizedText; // e.g. "Yellows and florals"
  note?: LocalizedText;
  icon?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  shape?: "tall" | "wide" | "square";
}

export interface GoodToKnowItem {
  title: LocalizedText;
  text: LocalizedText;
  icon?: string;
}

export interface WeddingConfig {
  locales: Locale[];

  couple: {
    bride: LocalizedText;
    groom: LocalizedText;
    monogram: string; // "A & K"
    families: LocalizedText; // "Together with their families"
  };

  /** Fully configurable Aurelia palette. */
  theme: {
    rose: string; // primary
    roseLight: string; // blush
    roseMuted: string;
    sage: string; // secondary
    sageDark: string;
    gold: string; // accent
    cream: string;
    ivory: string; // background
    ink: string; // text
  };

  intro: {
    enabled: boolean;
    invited: LocalizedText; // "You are invited"
    seal: LocalizedText; // "Tap the seal to open"
    monogram: string; // text shown on the wax seal
  };

  hero: {
    weddingDate: string; // ISO (the reveal + countdown target)
    city: LocalizedText; // "Udaipur"
    titleLead: LocalizedText; // "Join us as we say"
    titleEmphasis: LocalizedText; // "“I do”"
    subtitle: LocalizedText; // "Our forever begins"
    scratchPrompt: LocalizedText; // "Scratch the heart to reveal our date"
    backgroundImage: string;
  };

  story: {
    enabled: boolean;
    eyebrow: LocalizedText; // "How it began"
    heading: LocalizedText; // "Our Story"
    milestones: Milestone[];
  };

  gallery: {
    enabled: boolean;
    eyebrow: LocalizedText; // "Little moments"
    heading: LocalizedText; // "Our gallery"
    images: GalleryImage[];
    allowTryYourPhoto: boolean;
  };

  weekend: {
    enabled: boolean;
    eyebrow: LocalizedText; // "The celebrations"
    heading: LocalizedText; // "Wedding Weekend"
    events: WeekendEvent[];
  };

  location: {
    enabled: boolean;
    eyebrow: LocalizedText; // "Find your way to us"
    heading: LocalizedText; // "Location"
    venueName: LocalizedText; // "The Glasshouse"
    address: LocalizedText;
    mapUrl: string; // directions link
    mapEmbedUrl: string; // iframe src
  };

  goodToKnow: {
    enabled: boolean;
    eyebrow: LocalizedText; // "Before you come"
    heading: LocalizedText; // "Good to know"
    items: GoodToKnowItem[];
  };

  rsvp: {
    enabled: boolean;
    eyebrow: LocalizedText; // "Kindly respond"
    heading: LocalizedText; // "Will you be there?"
    deadline: LocalizedText; // "Please let us know by 1 Feb 2027"
    maxGuests: number;
    blessingEnabled: boolean;
  };

  music: {
    enabled: boolean;
    src: string;
    autoplayAttempt: boolean;
  };

  footer: {
    signoff: LocalizedText; // "With love,"
  };
}

export const weddingConfig: WeddingConfig = {
  locales: ["en", "hi"],

  couple: {
    bride: { en: "Aria", hi: "आरिया" },
    groom: { en: "Kabir", hi: "कबीर" },
    monogram: "A & K",
    families: {
      en: "Together with their families",
      hi: "अपने परिवारों के साथ",
    },
  },

  theme: {
    rose: "#d0a796",
    roseLight: "#f1dcd2",
    roseMuted: "#d8b3a4",
    sage: "#9fb09b",
    sageDark: "#7d8f7a",
    gold: "#c9a96b",
    cream: "#f3e3c9",
    ivory: "#fbf3e6",
    ink: "#5b4a42",
  },

  intro: {
    enabled: true,
    invited: { en: "You are invited", hi: "आप आमंत्रित हैं" },
    seal: { en: "Tap the seal to open", hi: "खोलने के लिए मुहर दबाएँ" },
    monogram: "A&K",
  },

  hero: {
    weddingDate: "2027-03-20T17:00:00+05:30",
    city: { en: "Udaipur", hi: "उदयपुर" },
    titleLead: { en: "Join us as we say", hi: "हमारे साथ कहिए" },
    titleEmphasis: { en: "“I do”", hi: "“क़बूल है”" },
    subtitle: { en: "Our forever begins", hi: "हमारा हमेशा शुरू होता है" },
    scratchPrompt: {
      en: "Scratch the heart to reveal our date",
      hi: "तारीख़ देखने के लिए दिल को खुरचें",
    },
    backgroundImage: "/photos/hero.svg",
  },

  story: {
    enabled: true,
    eyebrow: { en: "How it began", hi: "कैसे शुरू हुआ" },
    heading: { en: "Our Story", hi: "हमारी कहानी" },
    milestones: [
      {
        eyebrow: { en: "Where it all began", hi: "जहाँ सब शुरू हुआ" },
        title: { en: "First hello", hi: "पहली मुलाक़ात" },
        text: {
          en: "A crowded café, one empty chair, and a conversation that forgot to end.",
          hi: "एक भरी हुई कैफ़े, एक खाली कुर्सी, और एक बातचीत जो ख़त्म होना भूल गई।",
        },
        image: "/photos/story-1.svg",
      },
      {
        eyebrow: { en: "Hand in hand", hi: "हाथों में हाथ" },
        title: { en: "Long-distance years", hi: "दूरियों के साल" },
        text: {
          en: "Two cities, countless calls, and a love that only grew closer across the miles.",
          hi: "दो शहर, अनगिनत बातें, और एक प्यार जो दूरियों में और क़रीब आता गया।",
        },
        image: "/photos/story-2.svg",
      },
      {
        eyebrow: { en: "Two rings, one promise", hi: "दो अंगूठियाँ, एक वादा" },
        title: { en: "The question", hi: "वो सवाल" },
        text: {
          en: "Under a sky full of stars, one knee, one yes, and forever began.",
          hi: "तारों भरे आसमान के नीचे, एक घुटना, एक हाँ, और हमेशा शुरू हुआ।",
        },
        image: "/photos/story-3.svg",
      },
    ],
  },

  gallery: {
    enabled: true,
    eyebrow: { en: "Little moments", hi: "छोटे पल" },
    heading: { en: "Our gallery", hi: "हमारी गैलरी" },
    allowTryYourPhoto: true,
    images: [
      { src: "/photos/gallery-1.svg", alt: "Moment 1", shape: "tall" },
      { src: "/photos/gallery-2.svg", alt: "Moment 2", shape: "wide" },
      { src: "/photos/gallery-3.svg", alt: "Moment 3", shape: "square" },
      { src: "/photos/gallery-4.svg", alt: "Moment 4", shape: "square" },
      { src: "/photos/gallery-5.svg", alt: "Moment 5", shape: "tall" },
      { src: "/photos/gallery-6.svg", alt: "Moment 6", shape: "wide" },
    ],
  },

  weekend: {
    enabled: true,
    eyebrow: { en: "The celebrations", hi: "उत्सव" },
    heading: { en: "Wedding Weekend", hi: "विवाह सप्ताहांत" },
    events: [
      {
        id: "mehndi",
        name: { en: "Mehndi", hi: "मेहंदी" },
        datetime: "2027-03-18T16:00:00+05:30",
        venue: { en: "The Grand Courtyard", hi: "द ग्रैंड कोर्टयार्ड" },
        dressCodeLabel: { en: "Yellows and florals", hi: "पीला और फूलों वाला" },
        note: { en: "Henna, music and chai.", hi: "मेहंदी, संगीत और चाय।" },
        icon: "🌿",
      },
      {
        id: "haldi",
        name: { en: "Haldi", hi: "हल्दी" },
        datetime: "2027-03-19T10:00:00+05:30",
        venue: { en: "The Rose Garden", hi: "द रोज़ गार्डन" },
        dressCodeLabel: { en: "Greens and brights", hi: "हरा और चटख रंग" },
        note: { en: "A splash of turmeric and joy.", hi: "हल्दी और खुशियों की बौछार।" },
        icon: "🌼",
      },
      {
        id: "welcome",
        name: { en: "Welcome Evening", hi: "स्वागत संध्या" },
        datetime: "2027-03-19T19:30:00+05:30",
        venue: { en: "Poolside Lawn", hi: "पूलसाइड लॉन" },
        dressCodeLabel: { en: "Soft pastels", hi: "हल्के रंग" },
        note: { en: "Cocktails under the stars.", hi: "तारों तले कॉकटेल।" },
        icon: "🥂",
      },
      {
        id: "ceremony",
        name: { en: "Wedding Ceremony", hi: "विवाह समारोह" },
        datetime: "2027-03-20T17:00:00+05:30",
        venue: { en: "Lakeside Terrace", hi: "लेकसाइड टेरेस" },
        dressCodeLabel: { en: "Cocktail chic", hi: "कॉकटेल शिक" },
        note: { en: "Ceremony begins at sunset.", hi: "समारोह सूर्यास्त पर शुरू।" },
        icon: "💍",
      },
      {
        id: "reception",
        name: { en: "Reception & Dinner", hi: "स्वागत व रात्रिभोज" },
        datetime: "2027-03-20T20:00:00+05:30",
        venue: { en: "The Glasshouse Garden", hi: "द ग्लासहाउस गार्डन" },
        dressCodeLabel: { en: "Something that sparkles", hi: "कुछ चमकीला" },
        note: { en: "Dinner, dancing and more.", hi: "रात्रिभोज, नाच-गाना और भी बहुत कुछ।" },
        icon: "✨",
      },
    ],
  },

  location: {
    enabled: true,
    eyebrow: { en: "Find your way to us", hi: "हम तक पहुँचें" },
    heading: { en: "Location", hi: "स्थान" },
    venueName: { en: "The Glasshouse", hi: "द ग्लासहाउस" },
    address: {
      en: "Sample Lake Estate, Lake Pichola, Udaipur",
      hi: "सैंपल लेक एस्टेट, पिछोला झील, उदयपुर",
    },
    mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur",
    mapEmbedUrl: "https://www.google.com/maps?q=Lake+Pichola+Udaipur&output=embed",
  },

  goodToKnow: {
    enabled: true,
    eyebrow: { en: "Before you come", hi: "आने से पहले" },
    heading: { en: "Good to know", hi: "जानने योग्य बातें" },
    items: [
      {
        title: { en: "Dress code", hi: "ड्रेस कोड" },
        text: {
          en: "Soft pastels for the day, something that sparkles for the night.",
          hi: "दिन के लिए हल्के रंग, रात के लिए कुछ चमकीला।",
        },
        icon: "👗",
      },
      {
        title: { en: "Stay", hi: "ठहरने की व्यवस्था" },
        text: {
          en: "Rooms are blocked at the estate. Mention the wedding at booking.",
          hi: "एस्टेट में कमरे आरक्षित हैं। बुकिंग पर विवाह का उल्लेख करें।",
        },
        icon: "🛏️",
      },
      {
        title: { en: "Gifts", hi: "उपहार" },
        text: {
          en: "Your presence is the only present we need. Blessings welcome.",
          hi: "आपकी उपस्थिति ही हमारा सबसे बड़ा उपहार है।",
        },
        icon: "🎁",
      },
    ],
  },

  rsvp: {
    enabled: true,
    eyebrow: { en: "Kindly respond", hi: "कृपया उत्तर दें" },
    heading: { en: "Will you be there?", hi: "क्या आप आएँगे?" },
    deadline: {
      en: "Please let us know by 1 February 2027.",
      hi: "कृपया 1 फ़रवरी 2027 तक बताएँ।",
    },
    maxGuests: 4,
    blessingEnabled: true,
  },

  music: {
    enabled: true,
    src: "/audio/theme.mp3",
    autoplayAttempt: true,
  },

  footer: {
    signoff: { en: "With love,", hi: "प्यार के साथ," },
  },
};

