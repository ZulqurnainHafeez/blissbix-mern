const products = [
  // =====================================================
  // EXISTING PRODUCTS
  // =====================================================

  {
    name: "Matte Lipstick",
    description:
      "Long-lasting matte lipstick with rich color and a smooth, comfortable finish.",
    price: 1499,
    category: "Makeup",
    images: ["/products/matte-lipstick.jpg"],
    sizes: ["Standard"],
    colors: ["Red", "Pink", "Nude", "Brown"],
    stock: 25,
  },

  {
    name: "COSRX Sunscreen",
    description:
      "Lightweight daily sunscreen that helps protect the skin from harmful UV rays while keeping it comfortable.",
    price: 2499,
    category: "Skincare",
    images: ["/products/cosrx-sunscreen.webp"],
    sizes: ["50ml"],
    colors: [],
    stock: 20,
  },

  {
    name: "TIRTIR Cleansing Balm",
    description:
      "Gentle cleansing balm designed to remove makeup and impurities while leaving the skin feeling clean and soft.",
    price: 2899,
    category: "Skincare",
    images: ["/products/tirtir-cleansing-balm.webp"],
    sizes: ["100ml"],
    colors: [],
    stock: 15,
  },

  {
    name: "Urban Decay Eyeshadow Palette",
    description:
      "Beautiful eyeshadow palette featuring versatile shades for creating everyday and glamorous makeup looks.",
    price: 4999,
    category: "Makeup",
    images: ["/products/urban-decay-palette.webp"],
    sizes: ["Standard"],
    colors: ["Multi"],
    stock: 12,
  },

  {
    name: "Vaseline Gluta-Hya Lotion",
    description:
      "Moisturizing body lotion formulated to help keep skin soft, smooth and hydrated.",
    price: 1899,
    category: "Body Care",
    images: ["/products/vaseline-gluta-hya.jpg"],
    sizes: ["200ml", "400ml"],
    colors: [],
    stock: 30,
  },

  {
    name: "The Ordinary Serum",
    description:
      "Lightweight facial serum designed to complement your daily skincare routine.",
    price: 2299,
    category: "Skincare",
    images: ["/products/ordinary-serum.jpg"],
    sizes: ["30ml"],
    colors: [],
    stock: 18,
  },

  {
    name: "Pink Body Mist",
    description:
      "Refreshing body mist with a soft and pleasant fragrance for everyday use.",
    price: 1799,
    category: "Fragrance",
    images: ["/products/pink-body-mist.jpg"],
    sizes: ["100ml"],
    colors: [],
    stock: 20,
  },

  {
    name: "CeraVe Moisturizing Lotion",
    description:
      "Daily moisturizing lotion designed to help keep skin hydrated, soft and comfortable.",
    price: 2999,
    category: "Skincare",
    images: ["/products/cerave-moisturizing-lotion.jpg"],
    sizes: ["236ml", "473ml"],
    colors: [],
    stock: 15,
  },

  // =====================================================
  // SKINCARE
  // =====================================================

  {
    name: "70 Face Cream",
    description:
      "A nourishing face cream designed to keep skin soft, smooth and hydrated.",
    price: 1299,
    category: "Skincare",
    images: ["/products/70-face-cream.png"],
    colors: ["Original"],
    stock: 25,
  },

  {
    name: "70 Skincare Cream",
    description:
      "Daily skincare essential for comfortable, hydrated and healthy-looking skin.",
    price: 1199,
    category: "Skincare",
    images: ["/products/70-skincare.png"],
    colors: ["Original"],
    stock: 25,
  },

  {
    name: "Biodance Face Mask Duo",
    description:
      "A hydrating face mask duo designed to refresh and nourish the skin.",
    price: 1599,
    category: "Skincare",
    images: ["/products/biodance-face-mask-duo.png"],
    sizes: ["Duo Pack"],
    stock: 20,
  },

  {
    name: "Biodance Mask 2",
    description:
      "Hydrating skincare mask for a fresh and radiant-looking complexion.",
    price: 899,
    category: "Skincare",
    images: ["/products/biodance-mask-2.webp"],
    sizes: ["1 Mask"],
    stock: 30,
  },

  {
    name: "Biodance Mask Duo",
    description:
      "A convenient mask duo created for an easy at-home skincare routine.",
    price: 1499,
    category: "Skincare",
    images: ["/products/biodance-mask-duo.png"],
    sizes: ["Duo Pack"],
    stock: 20,
  },

  {
    name: "Biodance Face Mask",
    description:
      "A soothing face mask that helps leave skin feeling refreshed and hydrated.",
    price: 899,
    category: "Skincare",
    images: ["/products/biodance-mask.webp"],
    sizes: ["1 Mask"],
    stock: 30,
  },

  {
    name: "Blue Face Cream",
    description:
      "A lightweight moisturizing cream for soft and hydrated skin.",
    price: 1099,
    category: "Skincare",
    images: ["/products/blue-face-cream.png"],
    stock: 25,
  },

  {
    name: "Dropper Serum",
    description:
      "A lightweight facial serum designed for a simple and effective skincare routine.",
    price: 1799,
    category: "Skincare",
    images: ["/products/dropper-serum.webp"],
    sizes: ["30ml"],
    stock: 25,
  },

  {
    name: "Face Cream 2",
    description:
      "Daily face cream formulated for smooth, soft and moisturized-looking skin.",
    price: 1199,
    category: "Skincare",
    images: ["/products/face-cream-2.jpg"],
    stock: 25,
  },

  {
    name: "Face Cream 3",
    description:
      "A nourishing cream for everyday hydration and a comfortable skin feel.",
    price: 1299,
    category: "Skincare",
    images: ["/products/face-cream-3.png"],
    stock: 25,
  },

  {
    name: "Face Serum 2",
    description:
      "A lightweight serum for a fresh, hydrated and radiant-looking complexion.",
    price: 1699,
    category: "Skincare",
    images: ["/products/face-serum-2.jpg"],
    sizes: ["30ml"],
    stock: 20,
  },

  {
    name: "Face Wash",
    description:
      "A gentle daily face wash for a clean and refreshed feeling.",
    price: 999,
    category: "Skincare",
    images: ["/products/face-wash.jpg.jpg"],
    sizes: ["100ml"],
    stock: 30,
  },

  {
    name: "Frozen Berry Face Cream",
    description:
      "A rich moisturizing cream inspired by a fresh berry skincare routine.",
    price: 1399,
    category: "Skincare",
    images: ["/products/frozen-berry-cream.webp"],
    stock: 20,
  },

  {
    name: "Green Face Cream",
    description:
      "A refreshing face cream designed for everyday hydration.",
    price: 1199,
    category: "Skincare",
    images: ["/products/green-face-cream.webp"],
    stock: 25,
  },

  {
    name: "Green Serum",
    description:
      "A lightweight facial serum for a refreshed and hydrated complexion.",
    price: 1699,
    category: "Skincare",
    images: ["/products/green-serum-2.png"],
    sizes: ["30ml"],
    stock: 20,
  },

  {
    name: "Inkey List Serum",
    description:
      "A simple daily serum for a clean and effective skincare routine.",
    price: 2499,
    category: "Skincare",
    images: ["/products/inkey-list-serum.webp"],
    sizes: ["30ml"],
    stock: 15,
  },

  {
    name: "La Roche-Posay Serum",
    description:
      "A premium facial serum designed for a gentle daily skincare routine.",
    price: 3999,
    category: "Skincare",
    images: ["/products/laroche-posay-serum.webp"],
    sizes: ["30ml"],
    stock: 12,
  },

  {
    name: "La Roche-Posay Sunscreen",
    description:
      "Daily facial sunscreen for comfortable everyday sun protection.",
    price: 3999,
    category: "Skincare",
    images: ["/products/laroche-posay-sunscreen.webp"],
    sizes: ["50ml"],
    stock: 12,
  },

  {
    name: "Ordinary Serum",
    description:
      "A lightweight serum designed to fit easily into your everyday skincare routine.",
    price: 2199,
    category: "Skincare",
    images: ["/products/ordinary-serum.jpg"],
    sizes: ["30ml"],
    stock: 20,
  },

  {
    name: "Pink Face Cream",
    description:
      "A soft moisturizing cream for everyday skin hydration.",
    price: 1199,
    category: "Skincare",
    images: ["/products/pink-face-cream.jpg"],
    stock: 25,
  },

  {
    name: "Pink Face Cream 2",
    description:
      "A nourishing face cream for soft and comfortable-looking skin.",
    price: 1299,
    category: "Skincare",
    images: ["/products/pink-face-cream-2.jpg"],
    stock: 25,
  },

  {
    name: "Pink Face Cream 3",
    description:
      "A daily moisturizing cream for a fresh and hydrated complexion.",
    price: 1399,
    category: "Skincare",
    images: ["/products/pink-face-cream-3.jpg"],
    stock: 25,
  },

  {
    name: "Pink Serum",
    description:
      "A lightweight serum created for a fresh and radiant skincare routine.",
    price: 1699,
    category: "Skincare",
    images: ["/products/pink-serum.webp"],
    sizes: ["30ml"],
    stock: 20,
  },

  {
    name: "Rose Face Mask",
    description:
      "A soothing facial mask for a refreshed and hydrated skin feel.",
    price: 999,
    category: "Skincare",
    images: ["/products/rose-face-mask.webp"],
    sizes: ["1 Mask"],
    stock: 25,
  },

  {
    name: "USKIN Unlimited Cream",
    description:
      "A nourishing cream designed for everyday skin comfort and hydration.",
    price: 1499,
    category: "Skincare",
    images: ["/products/uskin-unlimited-cream.webp"],
    stock: 20,
  },

  {
    name: "Vaseline Gluta-Hya Lotion Duo",
    description:
      "A moisturizing lotion duo for smooth, soft and hydrated-looking skin.",
    price: 1999,
    category: "Skincare",
    images: ["/products/vaseline-gluta-hya-lotion-duo.png"],
    sizes: ["Duo Pack"],
    stock: 20,
  },

  {
    name: "Vegan Face Cream",
    description:
      "A gentle vegan-inspired moisturizer for everyday hydration.",
    price: 1399,
    category: "Skincare",
    images: ["/products/vegan-face-cream.webp"],
    stock: 20,
  },

  {
    name: "Vital Proteins Collagen",
    description:
      "A collagen wellness essential designed for a simple daily routine.",
    price: 4999,
    category: "Skincare",
    images: ["/products/vital-proteins-collagen.webp"],
    sizes: ["Standard"],
    stock: 10,
  },

  {
    name: "Vital Proteins Marine",
    description:
      "A premium marine wellness product for your everyday routine.",
    price: 4999,
    category: "Skincare",
    images: ["/products/vital-proteins-marine.webp"],
    sizes: ["Standard"],
    stock: 10,
  },

  // =====================================================
  // MAKEUP
  // =====================================================

  {
    name: "Blue Lip Balm",
    description:
      "A moisturizing lip balm for soft and comfortable lips.",
    price: 699,
    category: "Makeup",
    images: ["/products/blue-lip-balm.webp"],
    stock: 35,
  },

  {
    name: "Concealer",
    description:
      "A smooth concealer designed to help create an even-looking complexion.",
    price: 1199,
    category: "Makeup",
    images: ["/products/concealer.webp"],
    colors: ["Light", "Medium", "Deep"],
    stock: 25,
  },

  {
    name: "Contour Palette",
    description:
      "A versatile contour palette for adding definition and dimension.",
    price: 1799,
    category: "Makeup",
    images: ["/products/contour-palette.png"],
    colors: ["Universal"],
    stock: 20,
  },

  {
    name: "Eyebrow Pencil",
    description:
      "A precise eyebrow pencil for naturally defined brows.",
    price: 799,
    category: "Makeup",
    images: ["/products/eyebrow-pencil.webp"],
    colors: ["Brown", "Dark Brown", "Black"],
    stock: 30,
  },

  {
    name: "Eyeshadow Palette 2",
    description:
      "A versatile eyeshadow palette with shades for everyday and evening looks.",
    price: 1899,
    category: "Makeup",
    images: ["/products/eyeshadow-palette-2..webp"],
    colors: ["Mixed"],
    stock: 20,
  },

  {
    name: "Eyeshadow Palette",
    description:
      "A beautiful eyeshadow palette for creating soft and dramatic eye looks.",
    price: 1799,
    category: "Makeup",
    images: ["/products/eyeshadow-palette.jpg"],
    colors: ["Mixed"],
    stock: 20,
  },

  {
    name: "Face Makeup Palette",
    description:
      "A multi-purpose makeup palette for a complete everyday look.",
    price: 2199,
    category: "Makeup",
    images: ["/products/face-makeup-palette.jpg"],
    colors: ["Mixed"],
    stock: 20,
  },

  {
    name: "Foundation",
    description:
      "A smooth foundation designed to create an even and natural-looking finish.",
    price: 1599,
    category: "Makeup",
    images: ["/products/foundation-2.webp"],
    colors: ["Light", "Medium", "Deep"],
    stock: 25,
  },

  {
    name: "Gold Lipstick",
    description:
      "A rich lipstick with beautiful color and a smooth finish.",
    price: 999,
    category: "Makeup",
    images: ["/products/gold-lipstick.jpg"],
    colors: ["Gold"],
    stock: 30,
  },

  {
    name: "Lip Balm Duo",
    description:
      "A convenient lip balm duo for soft and moisturized lips.",
    price: 1199,
    category: "Makeup",
    images: ["/products/lip-balm-duo.jpg"],
    sizes: ["Duo Pack"],
    stock: 25,
  },

  {
    name: "Lip Gloss",
    description:
      "A glossy lip essential for a smooth and shiny finish.",
    price: 899,
    category: "Makeup",
    images: ["/products/lip-gloss.webp"],
    colors: ["Clear", "Pink", "Nude"],
    stock: 30,
  },

  {
    name: "Pink Eyeshadow Palette",
    description:
      "A pink-toned eyeshadow palette for soft and feminine makeup looks.",
    price: 1899,
    category: "Makeup",
    images: ["/products/pink-eyeshadow-palette.webp"],
    colors: ["Pink"],
    stock: 20,
  },

  {
    name: "Pink Lip Gloss",
    description:
      "A beautiful pink gloss for a shiny and polished lip look.",
    price: 899,
    category: "Makeup",
    images: ["/products/pink-lip-gloss.jpg"],
    colors: ["Pink"],
    stock: 30,
  },

  // =====================================================
  // FRAGRANCE
  // =====================================================

  {
    name: "Ink Perfume",
    description:
      "A sophisticated fragrance created for a confident everyday presence.",
    price: 2499,
    category: "Fragrance",
    images: ["/products/ink-perfume.webp"],
    sizes: ["50ml"],
    stock: 15,
  },

  {
    name: "Perfume Gift Set",
    description:
      "A beautifully presented fragrance gift set for special occasions.",
    price: 3499,
    category: "Fragrance",
    images: ["/products/perfume-gift-set.webp"],
    sizes: ["Gift Set"],
    stock: 12,
  },

  {
    name: "Perfume Set",
    description:
      "A curated fragrance set for adding variety to your everyday collection.",
    price: 2999,
    category: "Fragrance",
    images: ["/products/perfume-set.webp"],
    sizes: ["Set"],
    stock: 15,
  },

  {
    name: "Pink Perfume",
    description:
      "A feminine fragrance with a soft and elegant everyday character.",
    price: 2299,
    category: "Fragrance",
    images: ["/products/pink-perfume-3.webp"],
    sizes: ["50ml"],
    stock: 18,
  },

  {
    name: "White Perfume",
    description:
      "A clean and elegant fragrance suitable for everyday wear.",
    price: 2299,
    category: "Fragrance",
    images: ["/products/white-perfume.jpg"],
    sizes: ["50ml"],
    stock: 18,
  },

  {
    name: "Yellow Perfume",
    description:
      "A bright and refreshing fragrance for a confident everyday style.",
    price: 2299,
    category: "Fragrance",
    images: ["/products/yellow-perfume.jpg"],
    sizes: ["50ml"],
    stock: 18,
  },

  // =====================================================
  // HAIRCARE
  // =====================================================

  {
    name: "Fino Hair Treatment Set",
    description:
      "A complete hair treatment set designed to leave hair feeling soft and cared for.",
    price: 2499,
    category: "Haircare",
    images: ["/products/fino-hair-treatment-set.png"],
    sizes: ["Set"],
    stock: 15,
  },

  {
    name: "Keratin Hair Treatment",
    description:
      "A nourishing hair treatment designed for smoother and healthier-looking hair.",
    price: 1999,
    category: "Haircare",
    images: ["/products/keratin-hair-treatment.png"],
    sizes: ["Standard"],
    stock: 18,
  },

  // =====================================================
  // BODYCARE
  // =====================================================

  {
    name: "Green Body Wash",
    description:
      "A refreshing body wash for a clean and comfortable daily routine.",
    price: 999,
    category: "Bodycare",
    images: ["/products/green-body-wash.jpg"],
    sizes: ["400ml"],
    stock: 25,
  },
  // =====================================================
// NAILS
// =====================================================

{
  name: "Classic Nude Press On Nails",
  description:
    "Elegant nude press-on nails designed for a clean and polished everyday look.",
  price: 999,
  category: "Nails",
  images: ["/products/classic-nude-nails.webp"],
  sizes: ["Standard"],
  colors: ["Nude"],
  stock: 25,
},

{
  name: "Pink Glossy Press On Nails",
  description:
    "Beautiful glossy pink press-on nails for a soft and feminine look.",
  price: 1099,
  category: "Nails",
  images: ["/products/pink-glossy-nails.jpg"],
  sizes: ["Standard"],
  colors: ["Pink"],
  stock: 25,
},

{
  name: "French Tip Press On Nails",
  description:
    "Classic French tip press-on nails for an elegant and timeless finish.",
  price: 1199,
  category: "Nails",
  images: ["/products/french-tip-nails.jpg"],
  sizes: ["Standard"],
  colors: ["White", "Nude"],
  stock: 20,
},

{
  name: "Red Glam Press On Nails",
  description:
    "Bold red press-on nails designed to create a glamorous and confident look.",
  price: 1099,
  category: "Nails",
  images: ["/products/red-glam-nails.jpg"],
  sizes: ["Standard"],
  colors: ["Red"],
  stock: 20,
},
];

module.exports = products;