// Edit restaurant details here — every page reads from this file.
export const SITE = {
  name: "THE BITE",
  tagline: "Premium Restaurant · Kuakhia, Odisha",
  addressLines: ["Near The Celebration Mandap", "Chandipur, Kuakhia Market", "PIN 755009, Odisha, India"],
  phones: ["7077186377", "9237237550"],
  whatsapp: "917077186377", // primary WhatsApp number (with country code)
  // Replace with the owner's exact Google Maps link when available.
  mapsLink: "https://maps.app.goo.gl/Lg2VjMeTcikEymD18",
  mapsEmbed: "https://www.google.com/maps?q=Chandipur,+Kuakhia+Odisha+755009&output=embed",
  googleReviewsLink: "https://www.google.com/maps/search/?api=1&query=The+Bite+Restaurant+Kuakhia",
  instagram: "https://www.instagram.com/thebiterestro?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  facebook: "#",
  // Set to an imported image path once the real UPI QR is supplied.
  upiQr: null as string | null,
};

export const waLink = (text: string, number = SITE.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/location", label: "Location" },
  { to: "/order", label: "Order" },
  { to: "/the-celebration", label: "The Celebration" },
] as const;
