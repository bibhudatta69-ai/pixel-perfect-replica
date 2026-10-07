import biryani from "@/assets/biryani-hero.jpg";
import tandoori from "@/assets/tandoori.jpg";
import curryVeg from "@/assets/curry-veg.jpg";
import curryNonveg from "@/assets/curry-nonveg.jpg";
import chinese from "@/assets/chinese.jpg";
import starters from "@/assets/starters.jpg";
import riceNaan from "@/assets/rice-naan.jpg";
import drinksSoup from "@/assets/drinks-soup.jpg";
import special from "@/assets/special.jpg";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  veg: boolean;
  price?: number; // single price
  full?: number;
  half?: number;
  tbc?: boolean; // price to be confirmed
  image: string; // temporary photo — replace per item via IMAGE_OVERRIDES
};

export const CATEGORIES = [
  "Beverages", "Soups", "Chowmein & Noodles", "Veg & Non-Veg Rolls", "Veg Starters",
  "Non-Veg Starters", "Rice", "Roti & Naan", "Veg Curry", "Non-Veg Curry", "Veg Biryani",
  "Non-Veg Biryani", "Tandoori Non-Veg Kabab", "Special Biryani & Dishes",
] as const;

const CAT_IMAGE: Record<string, string> = {
  "Beverages": drinksSoup, "Soups": drinksSoup, "Chowmein & Noodles": chinese,
  "Veg & Non-Veg Rolls": starters, "Veg Starters": starters, "Non-Veg Starters": chinese,
  "Rice": riceNaan, "Roti & Naan": riceNaan, "Veg Curry": curryVeg, "Non-Veg Curry": curryNonveg,
  "Veg Biryani": biryani, "Non-Veg Biryani": biryani, "Tandoori Non-Veg Kabab": tandoori,
  "Special Biryani & Dishes": special,
};

// Per-item photo overrides: { "chicken-biryani": myPhoto }
export const IMAGE_OVERRIDES: Record<string, string> = {};

// Format: "Name|price" · "Name|FULL/HALF" · "Name|TBC". Prefix "V:" veg, "N:" non-veg.
const RAW: Record<string, string[]> = {
  "Beverages": ["V:Mineral Water Bottles|20", "V:Soda Bottles|20", "V:Plain Cold|20", "V:Masala Cold|40", "V:Fresh Lime Soda|40", "V:Ice Cream|50"],
  "Soups": ["V:Veg Soup|70", "V:Veg Manchow Soup|80", "V:Veg Hot & Sour Soup|80", "V:Veg Corn Soup|90", "V:Veg Coriander Soup|90", "N:Chicken Hot & Sour Soup|90", "N:Chicken Manchow Soup|90", "N:Chicken Corn Soup|90"],
  "Chowmein & Noodles": ["V:Veg Chowmein|70", "V:Veg Mix Chowmein|80", "V:Paneer Chowmein|80", "V:Veg Schezwan Chowmein|90", "N:Egg Chicken Chowmein|70", "N:Double Egg Chowmein|80", "N:Chicken Chowmein|80", "N:Mix Chowmein (Egg, Chicken, Prawn)|90", "N:Garlic Chicken Chowmein|90"],
  "Veg & Non-Veg Rolls": ["V:Veg Roll|70", "V:Paneer Roll|90", "V:Veg Mix Roll|90", "V:Mushroom Roll|90", "N:Egg Roll|70", "N:Double Egg Roll|80", "N:Egg Chicken Roll|80", "N:Double Egg Chicken Roll|90"],
  "Veg Starters": ["V:Veg Pakoda|120", "V:Veg Manchurian|130", "V:Masala Papad|30", "V:Roast Papad|20", "V:Chilli Gobi|150", "V:Gobi Manchurian|150", "V:Veg 65|150", "V:Gobi 65|150", "V:American Salt & Pepper|170", "V:Mushroom Salt & Pepper|180", "V:Chilli Paneer|220", "V:Chilli Mushroom|240", "V:Paneer Manchurian|220", "V:Mushroom Manchurian|220", "V:Paneer 65|230", "V:Mushroom 65|230", "V:Onion Pakoda|120", "V:Mushroom Pakoda|150", "V:Paneer Pakoda|190", "V:French Fry|120", "V:Dry Chana|120", "V:Chilli Baby Corn|150", "V:Baby Corn Manchurian|170", "V:Baby Corn 65|200", "V:Veg Kabab|TBC", "V:Paneer Tikka|220", "V:Paneer Hariyali Tikka|250", "V:Paneer Malai Tikka|250", "V:Mushroom Tikka|240"],
  "Non-Veg Starters": ["N:Chicken Pakoda|200/110", "N:Chicken Lollipop|240", "N:Chilli Chicken (Bone)|230/120", "N:Chilli Chicken (Boneless)|240/130", "N:Chicken Manchurian|220/120", "N:Chicken 65|220/120", "N:Schezwan Chicken|240/130", "N:Crispy Chicken|240/130", "N:Dragon Chicken|240", "N:Chicken Majestic|240", "N:Fish Chilli|250", "N:Fish Manchurian|240", "N:Fish 65|250", "N:Garlic Fish|240", "N:Crispy Fish|240", "N:Prawn Chilli|280", "N:Prawn Garlic|270", "N:Prawn 65|250", "N:Prawn Golden Fry|260", "N:Prawn Koliwada|220", "N:Chicken Salt & Pepper|240", "N:Golden Chicken|240"],
  "Rice": ["V:Plain Rice|60", "V:Veg Fry Rice|120", "V:Jeera Rice|80", "V:Veg Mix Fry Rice|140", "V:Lemon Rice|80", "V:Schezwan Veg Fry Rice|150", "N:Double Egg Fry Rice|120", "N:Chicken Fry Rice|150", "N:Mix Fry Rice (Chicken, Egg, Prawn)|170", "N:Schezwan Chicken Fry Rice|160"],
  "Roti & Naan": ["V:Tandoori Roti|20", "V:Tawa Roti|8", "V:Butter Roti|10", "V:Lacha Paratha|30", "V:Plain Naan|30", "V:Plain Kulcha|30", "V:Masala Kulcha|50", "V:Garlic Naan|50", "V:Butter Naan|35", "V:Plain Paratha|20"],
  "Veg Curry": ["V:Plain Tadka|120", "V:Paneer Tadka|150", "V:Dal Fry|120", "V:Yellow Dal Tadka|130", "V:Dal Makhani|150", "V:Mix Veg|150/80", "V:Veg Kadhai|170/90", "V:Veg Hyderabadi|180/110", "V:Veg JhalFry|150/80", "V:Aloo Gobi Masala|150/80", "V:Boiled Veg|130", "V:Paneer Butter Masala|250/140", "V:Paneer Kadhai|260/140", "V:Paneer Do Pyaza|250/140", "V:Paneer Punjabi Masala|260/140", "V:Paneer Hyderabadi|250/140", "V:Paneer Masala|220/110", "V:Kaju Paneer|250/130", "V:Paneer Tikka Masala|250/140", "V:Paneer Pasanda|260/140", "V:Mushroom Masala|220/110", "V:Mushroom Butter Masala|250/130", "V:Mushroom Kadhai|240/120", "V:Mushroom Do Pyaza|250/140", "V:Mushroom Hyderabadi|260/150", "V:Mokai Mushroom|260/140", "V:Mushroom Begum Bahar|260/140", "V:Chana Masala|140/70", "V:Punjabi Chana Masala|150/80", "V:Veg Kofta|180", "V:Malai Kofta|250", "V:Veg Diwani Handi|200", "V:Veg Kolhapuri|180", "V:Paneer Bhurta|250", "V:Paneer Bhujia|220"],
  "Non-Veg Curry": ["N:Egg Masala|80", "N:Egg Curry|70", "N:Egg Bhurji|60", "N:Egg Bhurji Curry|80", "N:Egg Omelette|50", "N:Egg Poach|40", "N:Chicken Curry|200/100", "N:Chicken Masala|240/120", "N:Chicken Kasha|220/120", "N:Chicken Butter Masala|250/140", "N:Chicken Punjabi Masala|260/130", "N:Chicken Hyderabadi|260/130", "N:Chicken Mughlai|260/130", "N:Chicken Do Pyaza|240/130", "N:Chicken Kadhai|240/130", "N:Chicken Patiala|260/130", "N:Chicken Tikka Masala|260/130", "N:The Bite Special Chicken Full|280", "N:Mutton Curry|320/200", "N:Mutton Masala|350/220", "N:Mutton Kasha|350/220", "N:Mutton Rogan Josh|370/240", "N:Mutton Kadhai|350", "N:Mutton Keema|360", "N:Fish Curry|100", "N:Homestyle Fish Curry|120", "N:Bengali Fish Curry|120", "N:Prawn Curry|300/180", "N:Prawn Masala|320/180", "N:Prawn Kadhai|340", "N:Prawn Do Pyaza|340", "N:Prawn Hyderabadi|350"],
  "Veg Biryani": ["V:Veg Biryani|120", "V:Paneer Biryani|160", "V:Mushroom Biryani|180"],
  "Non-Veg Biryani": ["N:Chicken Biryani|150", "N:Prawn Biryani|260", "N:Egg Biryani|120", "N:Mutton Biryani|260", "N:Fish Biryani|140"],
  "Tandoori Non-Veg Kabab": ["N:Tandoori Chicken (Full 4 pcs)|499", "N:Tandoori Chicken (Half 2 pcs)|260", "N:Tandoori Chicken (1 pc)|130", "N:Tandoori Chicken Kabab (1 pc)|100", "N:Chicken Tikka|220", "N:Malai Chicken Tikka|250", "N:Hariyali Chicken Tikka|250", "N:Achari Chicken Tikka|270"],
  "Special Biryani & Dishes": ["N:Bamboo Chicken Biriyani|220", "N:Bamboo Chicken|250", "V:Mushroom Patrapoda|100", "N:Chicken Patrapoda|120", "N:Fish Patrapoda|80"],
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const MENU: MenuItem[] = Object.entries(RAW).flatMap(([category, rows]) =>
  rows.map((row) => {
    const veg = row.startsWith("V:");
    const [name = "", p = ""] = row.slice(2).split("|");
    const id = slug(`${category}-${name}`);
    const base: MenuItem = {
  id,
  name,
  category,
  veg,
  image: IMAGE_OVERRIDES[id] ?? `/menu-items/${id}.jpg`,
};
    if (p === "TBC") return { ...base, tbc: true };
    if (p.includes("/")) {
      const [full = 0, half = 0] = p.split("/").map(Number);
      return { ...base, full, half };
    }
    return { ...base, price: Number(p) };
  }),
);

export const findItem = (id: string) => MENU.find((m) => m.id === id);
