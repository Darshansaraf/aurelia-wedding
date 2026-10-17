import type { Locale } from "./wedding.config";

/** Static UI labels (buttons, nav, form fields) per language. */
export const ui: Record<Locale, Record<string, string>> = {
  en: {
    nav_story: "Story",
    nav_gallery: "Gallery",
    nav_weekend: "Weekend",
    nav_location: "Location",
    nav_rsvp: "RSVP",

    skip_intro: "Skip intro",
    replay_intro: "Replay opening",
    open_invite: "Open",

    reveal_date: "Reveal the date",
    save_the_date: "Save the date",
    add_to_calendar: "Add to calendar",
    counting_down: "Counting down",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    the_big_day: "Today is the day",

    dress_code: "Dress code",
    try_your_photo: "Try your own photo",
    reset_photo: "Reset",

    get_directions: "Get directions",
    show_live_map: "Show live map",

    rsvp_name: "Your name",
    rsvp_email: "Email",
    rsvp_phone: "Phone",
    rsvp_guests: "Number of guests",
    rsvp_attending_q: "Will you join us?",
    rsvp_accept: "Joyfully accept",
    rsvp_decline: "Regretfully decline",
    rsvp_events: "Which celebrations?",
    rsvp_blessing: "Send a blessing",
    rsvp_submit: "Send RSVP",
    rsvp_sending: "Sending…",
    rsvp_success: "Thank you — your response is in. 🤍",
    rsvp_error: "Something went wrong. Please try again.",

    wishes_empty: "Be the first to send a blessing.",

    back_to_top: "Back to top",
  },
  hi: {
    nav_story: "कहानी",
    nav_gallery: "गैलरी",
    nav_weekend: "सप्ताहांत",
    nav_location: "स्थान",
    nav_rsvp: "आरएसवीपी",

    skip_intro: "इंट्रो छोड़ें",
    replay_intro: "फिर से खोलें",
    open_invite: "खोलें",

    reveal_date: "तारीख़ देखें",
    save_the_date: "तारीख़ सहेजें",
    add_to_calendar: "कैलेंडर में जोड़ें",
    counting_down: "गिनती जारी",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    the_big_day: "आज वही दिन है",

    dress_code: "ड्रेस कोड",
    try_your_photo: "अपनी तस्वीर आज़माएँ",
    reset_photo: "रीसेट",

    get_directions: "दिशा-निर्देश",
    show_live_map: "लाइव नक्शा दिखाएँ",

    rsvp_name: "आपका नाम",
    rsvp_email: "ईमेल",
    rsvp_phone: "फ़ोन",
    rsvp_guests: "मेहमानों की संख्या",
    rsvp_attending_q: "क्या आप आएँगे?",
    rsvp_accept: "सहर्ष स्वीकार",
    rsvp_decline: "क्षमा सहित अस्वीकार",
    rsvp_events: "कौन-से उत्सव?",
    rsvp_blessing: "शुभकामना भेजें",
    rsvp_submit: "आरएसवीपी भेजें",
    rsvp_sending: "भेजा जा रहा है…",
    rsvp_success: "धन्यवाद — आपका उत्तर मिल गया। 🤍",
    rsvp_error: "कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।",

    wishes_empty: "सबसे पहले शुभकामना भेजें।",

    back_to_top: "ऊपर जाएँ",
  },
};

