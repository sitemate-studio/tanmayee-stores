// src/lib/storeData.js

import { CATEGORIES } from "@/data/products";

// Store configuration
export const STORE_CONFIG = {
  name: "Tanmayee Fancy Store",
  tagline:
    "Your one-stop destination for ethnic fashion & accessories in Nizamabad",

  phone: "+91 96035 06616",
  phoneTel: "+919603506616",
  whatsappNumber: "919603506616",

  email: "tanmayeefancystore@gmail.com",

  address:
    "Main Road, Nizamabad, Telangana 503001, India",

  hours: "Mon – Sun: 10:00 AM – 8:00 PM",

  instagram:
    "https://instagram.com/tanmayeefancystore",

  googleMaps:
    "https://maps.google.com/?q=Nizamabad+Telangana",

  googleMapsStore:
    "https://maps.google.com/?q=Tanmayee+Fancy+Store+Nizamabad",

  googleBusiness:
    "https://g.page/tanmayeefancystore",
};

export const STORE_HOURS = [
  {
    day: "Monday – Friday",
    time: "10:00 am – 8:00 pm",
  },
  {
    day: "Saturday",
    time: "10:00 am – 9:00 pm",
  },
  {
    day: "Sunday",
    time: "11:00 am – 7:00 pm",
  },
];

// Main WhatsApp URL
export const WHATSAPP_URL = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

// Product enquiry WhatsApp URL
export const getWhatsAppProductURL = (productName) =>
  `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi! I'm interested in "${productName}" from Tanmayee Fancy Store. Please share more details.`
  )}`;

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