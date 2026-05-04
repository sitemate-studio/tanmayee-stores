// src/lib/storeData.js

// Store configuration
export const STORE_CONFIG = {
  name: "Tanmayee Fancy Store",
  tagline:
    "Your one-stop destination for ethnic fashion & accessories in Nizamabad",

  phone: "+91XXXXXXXXXX",
  whatsappNumber: "91XXXXXXXXXX",

  email: "tanmayeefancystore@gmail.com",

  address:
    "Main Road, Nizamabad, Telangana 503001, India",

  hours: "Mon – Sun: 10:00 AM – 8:00 PM",

  instagram:
    "https://instagram.com/tanmayeefancystore",

  googleMaps:
    "https://maps.google.com/?q=Nizamabad+Telangana",

  googleBusiness:
    "https://g.page/tanmayeefancystore",
};

// Main WhatsApp URL
export const WHATSAPP_URL = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

// Product enquiry WhatsApp URL
export const getWhatsAppProductURL = (productName) =>
  `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi! I'm interested in "${productName}" from Tanmayee Fancy Store. Please share more details.`
  )}`;

// Categories
export const CATEGORIES = [
  {
    slug: "necklace_sets",
    name_en: "Necklace Sets",
    name_te: "హారాలు",
    name_hi: "हार सेट",
    icon: "Gem",
  },

  {
    slug: "bangles",
    name_en: "Bangles",
    name_te: "గాజులు",
    name_hi: "चूड़ियाँ",
    icon: "Circle",
  },

  {
    slug: "sarees",
    name_en: "Sarees",
    name_te: "చీరలు",
    name_hi: "साड़ियाँ",
    icon: "Shirt",
  },

  {
    slug: "handbags",
    name_en: "Handbags",
    name_te: "హ్యాండ్ బ్యాగ్‌లు",
    name_hi: "हैंडबैग",
    icon: "ShoppingBag",
  },

  {
    slug: "earrings",
    name_en: "Earrings",
    name_te: "చెవి రింగులు",
    name_hi: "झुमके",
    icon: "Sparkles",
  },

  {
    slug: "hair_accessories",
    name_en: "Hair Accessories",
    name_te: "జుట్టు ఆక్సెసరీలు",
    name_hi: "हेयर एक्सेसरीज़",
    icon: "Flower2",
  },

  {
    slug: "dress_materials",
    name_en: "Dress Materials",
    name_te: "డ్రెస్ మెటీరియల్స్",
    name_hi: "ड्रेस मटेरियल",
    icon: "Scissors",
  },

  {
    slug: "ready_to_wear",
    name_en: "Ready-to-Wear",
    name_te: "రెడీమేడ్ దుస్తులు",
    name_hi: "रेडीमेड कपड़े",
    icon: "Palette",
  },
];

// Demo products
export const PRODUCTS = [
  {
    id: 1,
    category: "sarees",

    name_en: "Silk Saree",
    name_te: "సిల్క్ చీర",
    name_hi: "सिल्क साड़ी",

    description_en:
      "Premium silk saree with elegant design.",

    description_te:
      "అందమైన డిజైన్‌తో ప్రీమియం సిల్క్ చీర.",

    description_hi:
      "सुंदर डिज़ाइन वाली प्रीमियम सिल्क साड़ी।",

    price: 2499,

    in_stock: true,

    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    ],
  },

  {
    id: 2,
    category: "necklace_sets",

    name_en: "Bridal Necklace Set",
    name_te: "వధువు హారం సెట్",
    name_hi: "ब्राइडल हार सेट",

    description_en:
      "Traditional bridal necklace set.",

    description_te:
      "సాంప్రదాయ వధువు హారం సెట్.",

    description_hi:
      "पारंपरिक ब्राइडल हार सेट।",

    price: 1899,

    in_stock: true,

    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    ],
  },

  {
    id: 3,
    category: "bangles",

    name_en: "Designer Bangles",
    name_te: "డిజైనర్ గాజులు",
    name_hi: "डिज़ाइनर चूड़ियाँ",

    description_en:
      "Beautiful bangles for festive wear.",

    description_te:
      "పండుగల కోసం అందమైన గాజులు.",

    description_hi:
      "त्योहारों के लिए सुंदर चूड़ियाँ।",

    price: 799,

    in_stock: true,

    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d",
    ],
  },
];

// Announcement bar messages
export const ANNOUNCEMENTS = [
  "✨ New saree collection arrived — Visit our store!",
  "📍 Visit us in Nizamabad for the latest ethnic fashion",
  "💬 WhatsApp us for enquiries and custom orders",
];

// Helpers
export function getCategoryName(slug, lang = "en") {
  const category = CATEGORIES.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return slug;
  }

  if (lang === "te" && category.name_te) {
    return category.name_te;
  }

  if (lang === "hi" && category.name_hi) {
    return category.name_hi;
  }

  return category.name_en;
}

export function getProductName(product, lang = "en") {
  if (lang === "te" && product.name_te) {
    return product.name_te;
  }

  if (lang === "hi" && product.name_hi) {
    return product.name_hi;
  }

  return product.name_en;
}

export function getProductDescription(
  product,
  lang = "en"
) {
  if (
    lang === "te" &&
    product.description_te
  ) {
    return product.description_te;
  }

  if (
    lang === "hi" &&
    product.description_hi
  ) {
    return product.description_hi;
  }

  return product.description_en;
}

export function getSecondaryName(
  product,
  lang = "en"
) {
  if (lang !== "en") {
    return product.name_en;
  }

  if (product.name_te) {
    return product.name_te;
  }

  if (product.name_hi) {
    return product.name_hi;
  }

  return null;
}