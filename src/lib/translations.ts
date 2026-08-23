// Multilingual translations for English, Malayalam (മലയാളം), and Tamil (தமிழ்)

export type SupportedLanguage = 'en' | 'ml' | 'ta';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  languageName: string;
  roles: {
    citizen: string;
    volunteer: string;
    medical: string;
    police: string;
    admin: string;
  };
  safetyStatus: {
    safe: string;
    safeDesc: string;
    caution: string;
    cautionDesc: string;
    highRisk: string;
    highRiskDesc: string;
    critical: string;
    criticalDesc: string;
  };
  sos: {
    title: string;
    subtitle: string;
    medical: string;
    medicalSub: string;
    crowd: string;
    crowdSub: string;
    police: string;
    policeSub: string;
    reportBtn: string;
    readAloud: string;
  };
  categories: {
    medical_emergency: string;
    ambulance_required: string;
    missing_child: string;
    found_child: string;
    dangerous_crowd: string;
    crowd_blockage: string;
    theft: string;
    fight: string;
    fire: string;
    accident: string;
    suspicious_activity: string;
    infrastructure_damage: string;
    road_blocked: string;
    person_trapped: string;
    disaster: string;
    other: string;
  };
  reportModal: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    gpsLocked: string;
    landmarkPlaceholder: string;
    descPlaceholder: string;
    addPhoto: string;
    photoAdded: string;
    voiceMemo: string;
    voiceSaved: string;
    recording: string;
    submitBtn: string;
    submitting: string;
  };
  missingPerson: {
    title: string;
    subtitle: string;
    activeTab: string;
    reportMissing: string;
    reportFound: string;
    name: string;
    age: string;
    gender: string;
    clothes: string;
    lastSeen: string;
    attachPhoto: string;
    submitMissing: string;
    submitFound: string;
    matchFound: string;
    reuniteBtn: string;
  };
  community: {
    title: string;
    subtitle: string;
    iCanHelp: string;
    helping: string;
  };
  map: {
    title: string;
    safeZone: string;
    hazardZone: string;
    youAreHere: string;
    evacuateTo: string;
  };
  alerts: {
    criticalAlert: string;
    whatToDo: string;
    whatNotToDo: string;
    safeCorridor: string;
    acknowledgeBtn: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  // 1. ENGLISH
  en: {
    appName: 'SURAKSHA 360',
    tagline: 'Smart Public Safety & Crowd Help',
    languageName: 'English',
    roles: {
      citizen: 'Citizen / Public',
      volunteer: 'Volunteer',
      medical: 'Medical Corps',
      police: 'Police / Security',
      admin: 'Control Room'
    },
    safetyStatus: {
      safe: 'EVENT STATUS: SAFE',
      safeDesc: 'Everything is peaceful and safe. Enjoy the gathering.',
      caution: 'EVENT STATUS: CAUTION',
      cautionDesc: 'Crowd is increasing in some areas. Please take care.',
      highRisk: 'EVENT STATUS: HIGH RISK',
      highRiskDesc: 'Heavy crowd surge. Please avoid congested gates.',
      critical: 'EVENT STATUS: CRITICAL EMERGENCY',
      criticalDesc: 'Danger in this area! Follow volunteer and police directions.'
    },
    sos: {
      title: '1-TAP EMERGENCY SOS',
      subtitle: 'Press any button for immediate help at your GPS location',
      medical: 'Doctor / Ambulance',
      medicalSub: 'Injury or Fainting',
      crowd: 'Crowd Danger',
      crowdSub: 'Crush or Suffocation',
      police: 'Police / Security',
      policeSub: 'Theft or Danger',
      reportBtn: 'REPORT ANY PROBLEM',
      readAloud: 'Read Aloud in Voice'
    },
    categories: {
      medical_emergency: 'Medical Aid / Fainting',
      ambulance_required: 'Ambulance Needed',
      missing_child: 'Missing Child',
      found_child: 'Found a Child',
      dangerous_crowd: 'Crowd Crush / Push',
      crowd_blockage: 'Blocked Road / Gate',
      theft: 'Theft / Pickpocket',
      fight: 'Fight / Violence',
      fire: 'Fire Outbreak',
      accident: 'Accident',
      suspicious_activity: 'Suspicious Activity',
      infrastructure_damage: 'Broken Barricade',
      road_blocked: 'Road Obstruction',
      person_trapped: 'Person Trapped',
      disaster: 'Building / Stage Collapse',
      other: 'Other Help'
    },
    reportModal: {
      title: 'REPORT A PROBLEM',
      subtitle: 'Your location is sent automatically',
      step1: '1. What happened? (Tap Icon)',
      step2: '2. How urgent is it?',
      step3: '3. Where is it? (Landmark)',
      gpsLocked: 'GPS LOCATION LOCKED',
      landmarkPlaceholder: 'e.g. Near Gate 3 / Food Stall',
      descPlaceholder: 'Say what happened in simple words...',
      addPhoto: 'Take / Add Photo',
      photoAdded: 'Photo Attached',
      voiceMemo: 'Record Voice Note',
      voiceSaved: 'Voice Note Saved',
      recording: 'Recording Voice...',
      submitBtn: 'SEND EMERGENCY REPORT NOW',
      submitting: 'Sending to Help Team...'
    },
    missingPerson: {
      title: 'Lost & Found Children',
      subtitle: 'Find or report missing family members',
      activeTab: 'Active Cases',
      reportMissing: 'Report Lost Child',
      reportFound: 'I Found a Child',
      name: 'Person / Child Name',
      age: 'Age (Years)',
      gender: 'Gender',
      clothes: 'Clothing Color & Dress',
      lastSeen: 'Where was child last seen?',
      attachPhoto: 'Add Child Photo',
      submitMissing: 'Register Lost Child Case',
      submitFound: 'Register Found Child Case',
      matchFound: 'Photo & Details Match Found!',
      reuniteBtn: 'Confirm & Reunite Child'
    },
    community: {
      title: 'Community Help Requests',
      subtitle: 'Simple, safe ways you can help people nearby',
      iCanHelp: 'I Can Help',
      helping: 'You Are Helping'
    },
    map: {
      title: 'Live Safety Map',
      safeZone: 'Safe Ground',
      hazardZone: 'Danger Area',
      youAreHere: 'You Are Here',
      evacuateTo: 'Walk toward Safe Zone'
    },
    alerts: {
      criticalAlert: 'EMERGENCY SAFETY ALERT',
      whatToDo: 'WHAT YOU SHOULD DO:',
      whatNotToDo: 'DO NOT DO THIS:',
      safeCorridor: 'WALK TOWARD:',
      acknowledgeBtn: 'I UNDERSTAND & WILL FOLLOW'
    }
  },

  // 2. MALAYALAM (മലയാളം)
  ml: {
    appName: 'സുരക്ഷ 360',
    tagline: 'ജനങ്ങളുടെ സുരക്ഷയ്ക്കും സഹായത്തിനും',
    languageName: 'മലയാളം',
    roles: {
      citizen: 'പൊതുജനം / നിങ്ങൾ',
      volunteer: 'വളണ്ടിയർ',
      medical: 'മെഡിക്കൽ ടീം',
      police: 'പോലീസ് / സുരക്ഷ',
      admin: 'കൺട്രോൾ റൂം'
    },
    safetyStatus: {
      safe: 'നിലവിലെ അവസ്ഥ: സുരക്ഷിതം',
      safeDesc: 'എല്ലാം ശാന്തവും സുരക്ഷിതവുമാണ്. ഉത്സവം ആസ്വദിക്കൂ.',
      caution: 'നിലവിലെ അവസ്ഥ: ശ്രദ്ധിക്കുക',
      cautionDesc: 'ചില ഭാഗങ്ങളിൽ തിരക്ക് കൂടുന്നുണ്ട്. ശ്രദ്ധയോടെ നീങ്ങുക.',
      highRisk: 'നിലവിലെ അവസ്ഥ: വലിയ തിരക്ക് / അപകട സാധ്യത',
      highRiskDesc: 'ഗേറ്റുകളിൽ കനത്ത തിരക്ക് അനുഭവപ്പെടുന്നു. അങ്ങോട്ട് പോകരുത്.',
      critical: 'നിലവിലെ അവസ്ഥ: അടിയന്തര സാഹചര്യം / അപായം',
      criticalDesc: 'ഈ ഭാഗത്ത് കനത്ത അപകട സാധ്യത! പോലീസിന്റെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.'
    },
    sos: {
      title: 'അടിയന്തര സഹായം (1-ടാപ്പ് SOS)',
      subtitle: 'ഒരു ബട്ടൺ അമർത്തിയാൽ നിങ്ങളുടെ ലൊക്കേഷനിലേക്ക് ഉടൻ സഹായം എത്തും',
      medical: 'ഡോക്ടർ / ആംബുലൻസ്',
      medicalSub: 'അസുഖം അല്ലെങ്കിൽ തലകറക്കം',
      crowd: 'തിരക്കിൽ പെട്ടുപോയി',
      crowdSub: 'ശ്വാസം മുട്ടൽ / തിക്കും തിരക്കും',
      police: 'പോലീസ് സഹായം',
      policeSub: 'മോഷണം / ഭീഷണി / അടിപിടി',
      reportBtn: 'അടിയന്തര പരാതി അറിയിക്കുക',
      readAloud: 'ഉറക്കെ വായിച്ചു കേൾപ്പിക്കുക'
    },
    categories: {
      medical_emergency: 'ആരോഗ്യ പ്രശ്നം / തലകറങ്ങി വീണു',
      ambulance_required: 'ആംബുലൻസ് വേണം',
      missing_child: 'കുട്ടിയെ കാണാതായി',
      found_child: 'ഒരു കുട്ടിയെ കിട്ടി',
      dangerous_crowd: 'ഭയങ്കരമായ തിക്കും തിരക്കും',
      crowd_blockage: 'വഴി അടഞ്ഞുപോയി',
      theft: 'മോഷണം / മാല പറിക്കൽ',
      fight: 'അടിപിടി / തർക്കം',
      fire: 'തീപിടുത്തം',
      accident: 'അപകടം',
      suspicious_activity: 'സംശയാസ്പദമായ കാര്യം',
      infrastructure_damage: 'ബാരിക്കേഡ് തകർന്നു',
      road_blocked: 'വഴിയിൽ തടസ്സം',
      person_trapped: 'ആളുകൾ കുടുങ്ങിക്കിടക്കുന്നു',
      disaster: 'കെട്ടിടം / പന്തൽ വീണു',
      other: 'മറ്റു സഹായങ്ങൾ'
    },
    reportModal: {
      title: 'അപകടം അല്ലെങ്കിൽ പ്രശ്നം അറിയിക്കുക',
      subtitle: 'നിങ്ങളുടെ സ്ഥലം ഫോൺ തനിയെ രേഖപ്പെടുത്തും',
      step1: '1. എന്ത് പ്രശ്നമാണ്? (ചിഹ്നത്തിൽ തൊടുക)',
      step2: '2. എത്രമാത്രം ഗൗരവമുള്ളതാണ്?',
      step3: '3. ഏത് സ്ഥലത്തിന് അടുത്താണ്?',
      gpsLocked: 'നിങ്ങളുടെ ലൊക്കേഷൻ ലഭിച്ചു',
      landmarkPlaceholder: 'ഉദാ: ഗേറ്റ് 3-ന് അടുത്ത് / ചായക്കടയ്ക്ക് മുന്നിൽ',
      descPlaceholder: 'എന്താണ് സംഭവിച്ചതെന്ന് ലളിതമായി എഴുതുക...',
      addPhoto: 'ഫോട്ടോ എടുക്കുക',
      photoAdded: 'ഫോട്ടോ ചേർത്തു',
      voiceMemo: 'ശബ്ദ സന്ദേശം റെക്കോർഡ് ചെയ്യുക',
      voiceSaved: 'ശബ്ദം രേഖപ്പെടുത്തി',
      recording: 'ശബ്ദം റെക്കോർഡ് ചെയ്യുന്നു...',
      submitBtn: 'സഹായത്തിനായി ഇപ്പോൾ അയക്കുക',
      submitting: 'കൺട്രോൾ റൂമിലേക്ക് അയക്കുന്നു...'
    },
    missingPerson: {
      title: 'കാണാതായ കുട്ടികളും ആളുകളും',
      subtitle: 'കാണാതായവരെ കണ്ടെത്താനും സഹായിക്കാനും',
      activeTab: 'നിലവിലെ കേസുകൾ',
      reportMissing: 'കുട്ടിയെ കാണാനില്ല',
      reportFound: 'ഒരു കുട്ടിയെ കിട്ടി',
      name: 'കാണാതായ ആളുടെ പേര്',
      age: 'പ്രായം (വയസ്സ്)',
      gender: 'ലിംഗം',
      clothes: 'ധരിച്ചിരിക്കുന്ന വസ്ത്രത്തിന്റെ നിറം / അടയാളം',
      lastSeen: 'അവസാനം കണ്ട സ്ഥലം ഏതാണ്?',
      attachPhoto: 'ഫോട്ടോ ചേർക്കുക',
      submitMissing: 'കാണാതായ വിവരം രജിസ്റ്റർ ചെയ്യുക',
      submitFound: 'കിട്ടിയ വിവരം രജിസ്റ്റർ ചെയ്യുക',
      matchFound: 'യോജിക്കുന്ന കുട്ടിയെ കണ്ടെത്തി!',
      reuniteBtn: 'മാതാപിതാക്കൾക്ക് കൈമാറുക'
    },
    community: {
      title: 'നിങ്ങൾക്ക് ചെയ്യാവുന്ന സഹായങ്ങൾ',
      subtitle: 'സമീപത്തുള്ള ആളുകളെ സുരക്ഷിതമായി സഹായിക്കൂ',
      iCanHelp: 'ഞാൻ സഹായിക്കാം',
      helping: 'നിങ്ങൾ സഹായിക്കുന്നു'
    },
    map: {
      title: 'സുരക്ഷാ മാപ്പ്',
      safeZone: 'സുരക്ഷിത സ്ഥലം',
      hazardZone: 'അപകട സാധ്യതയുള്ള സ്ഥലം',
      youAreHere: 'നിങ്ങൾ നിൽക്കുന്ന സ്ഥലം',
      evacuateTo: 'ഈ സുരക്ഷിത സ്ഥലത്തേക്ക് നടക്കുക'
    },
    alerts: {
      criticalAlert: 'അടിയന്തര സുരക്ഷാ മുന്നറിയിപ്പ്',
      whatToDo: 'നിങ്ങൾ ചെയ്യേണ്ടത്:',
      whatNotToDo: 'ചെയ്യാൻ പാടില്ലാത്തത്:',
      safeCorridor: 'ഇങ്ങോട്ട് നീങ്ങുക:',
      acknowledgeBtn: 'മനസ്സിലായി, ഞാൻ പാലിക്കാം'
    }
  },

  // 3. TAMIL (தமிழ்)
  ta: {
    appName: 'சுரக்ஷா 360',
    tagline: 'மக்கள் பாதுகாப்பு மற்றும் அவசர உதவி',
    languageName: 'தமிழ்',
    roles: {
      citizen: 'பொதுமக்கள் / நீங்கள்',
      volunteer: 'தன்னார்வலர்',
      medical: 'மருத்துவக் குழு',
      police: 'காவல்துறை / பாதுகாப்பு',
      admin: 'கட்டுப்பாட்டு அறை'
    },
    safetyStatus: {
      safe: 'தற்போதைய நிலை: பாதுகாப்பானது',
      safeDesc: 'அனைத்தும் அமைதியாகவும் பாதுகாப்பாகவும் உள்ளது. திருவிழாவை மகிழுங்கள்.',
      caution: 'தற்போதைய நிலை: எச்சரிக்கை',
      cautionDesc: 'சில பகுதிகளில் கூட்டம் அதிகரிக்கிறது. கவனமாக செல்லுங்கள்.',
      highRisk: 'தற்போதைய நிலை: அதிக கூட்டம் / ஆபத்து',
      highRiskDesc: 'நுழைவு வாயில்களில் கடும் நெரிசல். அங்கு செல்ல வேண்டாம்.',
      critical: 'தற்போதைய நிலை: அவசர நிலை / ஆபத்து',
      criticalDesc: 'இப்பகுதியில் பெரும் ஆபத்து! காவல்துறை வழிகாட்டுதலைப் பின்பற்றுங்கள்.'
    },
    sos: {
      title: 'அவசர உதவி (1-டேப் SOS)',
      subtitle: 'ஒரு பொத்தானை அழுத்தினால் உங்கள் இடத்திற்கு உடனடியாக உதவி வரும்',
      medical: 'மருத்துவர் / ஆம்புலன்ஸ்',
      medicalSub: 'காயம் அல்லது மயக்கம்',
      crowd: 'கூட்ட நெரிசல் ஆபத்து',
      crowdSub: 'மூச்சுத் திணறல் / தள்ளுமுள்ளு',
      police: 'காவல்துறை உதவி',
      policeSub: 'திருட்டு / அச்சுறுத்தல் / மோதல்',
      reportBtn: 'பிரச்சினையைப் புகாரளிக்கவும்',
      readAloud: 'குரலில் வாசிக்கவும்'
    },
    categories: {
      medical_emergency: 'உடல்நலக் குறைவு / மயக்கம்',
      ambulance_required: 'ஆம்புலன்ஸ் தேவை',
      missing_child: 'குழந்தையைக் காணவில்லை',
      found_child: 'குழந்தை கிடைத்துள்ளது',
      dangerous_crowd: 'கடும் கூட்ட நெரிசல்',
      crowd_blockage: 'வழி அடைக்கப்பட்டுள்ளது',
      theft: 'திருட்டு / நகை பறிப்பு',
      fight: 'சண்டை / மோதல்',
      fire: 'தீ விபத்து',
      accident: 'விபத்து',
      suspicious_activity: 'சந்தேகத்திற்கிடமான செயல்',
      infrastructure_damage: 'தடுப்பு வேலி உடைந்தது',
      road_blocked: 'பாதையில் தடை',
      person_trapped: 'மக்கள் சிக்கியுள்ளனர்',
      disaster: 'கூரை / பந்தல் சரிந்தது',
      other: 'பிற உதவிகள்'
    },
    reportModal: {
      title: 'பிரச்சினையைப் புகாரளிக்கவும்',
      subtitle: 'உங்கள் இருப்பிடம் தானாக அனுப்பப்படும்',
      step1: '1. என்ன பிரச்சினை? (படத்தைத் தொடவும்)',
      step2: '2. எவ்வளவு அவசரம்?',
      step3: '3. எந்த இடத்திற்கு அருகில் உள்ளது?',
      gpsLocked: 'உங்கள் இடம் பூட்டப்பட்டது',
      landmarkPlaceholder: 'எ.கா: கேட் 3 அருகில் / தேநீர்க்கடை முன்',
      descPlaceholder: 'நடந்ததை எளிய வார்த்தைகளில் கூறவும்...',
      addPhoto: 'படம் எடுக்கவும்',
      photoAdded: 'படம் சேர்க்கப்பட்டது',
      voiceMemo: 'குரல் பதிவு செய்யவும்',
      voiceSaved: 'குரல் பதிவு சேமிக்கப்பட்டது',
      recording: 'குரல் பதிவு செய்யப்படுகிறது...',
      submitBtn: 'உடனடி உதவிக்கு அனுப்பவும்',
      submitting: 'அனுப்பப்படுகிறது...'
    },
    missingPerson: {
      title: 'காணாமல் போன குழந்தைகள் & நபர்கள்',
      subtitle: 'குடும்பத்தினரைக் கண்டுபிடிக்கவும் ஒப்படைக்கவும்',
      activeTab: 'நடப்பு தகவல்கள்',
      reportMissing: 'குழந்தையைக் காணவில்லை',
      reportFound: 'குழந்தை கிடைத்துள்ளது',
      name: 'காணாமல் போனவரின் பெயர்',
      age: 'வயது',
      gender: 'பாலினம்',
      clothes: 'அணிந்துள்ள ஆடை நிறம் & விவரம்',
      lastSeen: 'கடைசியாக எங்கு பார்த்தீர்கள்?',
      attachPhoto: 'புகைப்படம் சேர்க்கவும்',
      submitMissing: 'காணாமல் போன தகவலைப் பதிவு செய்',
      submitFound: 'கிடைத்த தகவலைப் பதிவு செய்',
      matchFound: 'பொருந்தும் குழந்தை அடையாளம் காணப்பட்டது!',
      reuniteBtn: 'பெற்றோரிடம் ஒப்படைக்கவும்'
    },
    community: {
      title: 'பொதுமக்கள் உதவி கோரிக்கைகள்',
      subtitle: 'அருகிலுள்ள மக்களுக்கு எளிய முறையில் உதவுங்கள்',
      iCanHelp: 'நான் உதவுகிறேன்',
      helping: 'நீங்கள் உதவுகிறீர்கள்'
    },
    map: {
      title: 'பாதுகாப்பு வரைபடம்',
      safeZone: 'பாதுகாப்பான பகுதி',
      hazardZone: 'ஆபத்தான பகுதி',
      youAreHere: 'நீங்கள் இருக்கும் இடம்',
      evacuateTo: 'இந்தப் பாதுகாப்பான இடத்திற்கு செல்லவும்'
    },
    alerts: {
      criticalAlert: 'அவசர பாதுகாப்பு எச்சரிக்கை',
      whatToDo: 'நீங்கள் செய்ய வேண்டியவை:',
      whatNotToDo: 'செய்யக் கூடாதவை:',
      safeCorridor: 'செல்ல வேண்டிய திசை:',
      acknowledgeBtn: 'புரிந்தது, நான் கடைப்பிடிப்பேன்'
    }
  }
};
