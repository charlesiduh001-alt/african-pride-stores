/* ==========================================================================
   AFRICAN PRIDE STORES
   Everything you are likely to want to change lives in the CONFIG and
   PRODUCTS blocks below. Scroll past those and it is just the machinery.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. CONFIG
   -------------------------------------------------------------------------- */

const CONFIG = {
  // WhatsApp number in international format: no +, no spaces, no zeros in front.
  // Nigerian 0815 070 9963 becomes 2348150709963.
  whatsappNumber: "2348150709963",

  // The same number written the pretty way, for display only.
  phoneDisplay: "0815 070 9963",

  // Link to the stock and price sheet, so the shop can mark things out of
  // stock and change prices without touching any code. Paste the published
  // CSV address here. STOCK.md explains how to set the sheet up.
  //
  // Leaving this empty switches the whole thing off and the site behaves
  // exactly as it does now, so it is safe to leave blank until the sheet
  // is ready.
  stockSheetUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmMoauyoDpGS4HA_siqdcgBuXreOfDpww44zG84gJQBqDYsTqwyUV3tUkhZO8b_aeTEuXrWaL6y4PQ/pub?output=csv",

  // Shown where the sheet has no price for something. Prices move often, so
  // saying nothing is safer than showing a number that has gone stale.
  noPriceText: "Ask us for today's price",

  // The Paystack payment page. The basket sends the total to it.
  //
  // Important: this page takes the amount in NAIRA, not kobo. 12500 means
  // twelve thousand five hundred naira. That is the opposite of Paystack's
  // API, which uses kobo, so do not "correct" it. Checked against the real
  // page on 2026-09-08.
  paystackPageUrl: "https://paystack.shop/pay/rxc1b74jry",

  // Where a Google Form records each order, so the shop knows what was bought
  // when the money lands. Paystack only reports who paid and how much.
  //
  // Leave empty and the basket still works, it just will not keep a record.
  // ORDERS.md explains how to set this up.
  orderFormUrl: "",
  orderFormFields: {
    phone: "",   // entry.xxxxxxx for the phone number question
    order: "",   // entry.xxxxxxx for the list of items
    total: "",   // entry.xxxxxxx for the total
  },
};


/* --------------------------------------------------------------------------
   2. PRODUCTS
   --------------------------------------------------------------------------
   Each product looks like this:

     {
       id:      unique short name, used internally, no spaces
       name:    what the customer reads
       brand:   shown as a small label above the name
       blurb:   one short selling line
       category: must match one of the filter chips in index.html
       sizes:   what the customer chooses from. See the two forms below.
       chooseLabel: wording above the dropdown. Defaults to "Size", so only
                set it when "Type" or "Flavour" reads better.
       image:   file name inside the images/ folder. If the file is missing,
                a drawn placeholder shows instead, so nothing ever looks broken.
       images:  optional. Different photo per choice, so the picture changes
                when the customer picks a size. See below.
       art:     shape of that placeholder: "jug", "bottle", "jar" or "box"
       colour:  main colour of the placeholder
     }

   The sizes list takes two forms.

   A plain list, when every choice sits at the same level:

     sizes: ["5 litres", "3 litres", "750ml"]

   Or a grouped list, when the choices fall into families. Each group becomes a
   heading inside the dropdown, which is how one Knorr card can hold the cubes
   and the powders, and one Checkers card can hold every flavour and size:

     sizes: [
       { group: "Vanilla", options: ["Vanilla 2kg", "Vanilla 1kg"] },
       { group: "Banana",  options: ["Banana 2kg",  "Banana 1kg"] },
     ]

   Write each option out in full, because that full text is what goes into the
   basket and the WhatsApp message. On screen the group name is trimmed off the
   front, so the shopper reads a tidy "2kg" under the "Vanilla" heading.

   Leave sizes as [] if the product only comes one way.

   To show a different photo per choice, add an images block. The key is the
   choice, the value is the file name:

     image: "laziz-vegetable-oil.jpg",        // used when nothing else matches
     images: {
       "5 litres": "laziz-vegetable-oil-5l.jpg",
       "750ml":    "laziz-vegetable-oil-750ml.jpg",
     },

   You only list the ones that actually look different. Anything missing falls
   back to image, so a half finished set still works.

   A group name works as a key too. Checkers custard has nine choices but only
   three real looks, so three lines cover it rather than nine:

     images: {
       "Vanilla":  "checkers-vanilla.jpg",
       "3n1 Milk": "checkers-milk.jpg",
       "Banana":   "checkers-banana.jpg",
     },

   To add a product, copy any block below and change the values.
   -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: "laziz-vegetable-oil",
    name: "Laziz Vegetable Oil",
    brand: "Laziz",
    blurb: "Pure, healthy, great taste.",
    category: "oils",
    sizes: ["5 litres", "3 litres", "1.6 litres", "1 litre", "750ml"],
    image: "laziz-vegetable-oil.jpg",
    // Every size has its own photo from the manufacturer portfolio.
    images: {
      "3 litres": "laziz-vegetable-oil-3l.jpg",
      "1.6 litres": "laziz-vegetable-oil-1-6l.jpg",
      "1 litre": "laziz-vegetable-oil-1l.jpg",
      "750ml": "laziz-vegetable-oil-750ml.jpg",
    },
    art: "jug",
    colour: "#F2B705",
  },
  {
    id: "laziz-premium-oil",
    name: "Laziz Premium Vegetable Oil",
    brand: "Laziz",
    blurb: "The premium grade, light and clean.",
    category: "oils",
    // Both sizes share the one photo. The portfolio only pictures the bottle
    // once, because it is the same container with a different size printed on.
    sizes: ["5 litres", "3 litres"],
    image: "laziz-premium-oil.jpg",
    art: "jug",
    colour: "#F5D98A",
  },
  {
    id: "active-gold",
    name: "Active Gold",
    brand: "Active",
    blurb: "Premium refined soya oil.",
    category: "oils",
    sizes: ["5 litres", "3 litres"],
    image: "active-gold.jpg",
    art: "jug",
    colour: "#EFE0A8",
  },
  {
    id: "active-vegetable-oil",
    name: "Active Vegetable Oil",
    brand: "Active",
    blurb: "A healthy choice for a better you.",
    category: "oils",
    sizes: ["25 litres", "5 litres", "3 litres"],
    // The default is now the jerrycan rather than the keg, because the 3 litre
    // has no photo of its own and a jerrycan is far closer to it than a keg.
    image: "active-vegetable-oil.jpg",
    images: {
      "25 litres": "active-vegetable-oil-25l.jpg",
    },
    art: "bottle",
    colour: "#E8A317",
  },
  {
    id: "winners-soya-oil",
    name: "Winners Soya Oil",
    brand: "Winners",
    blurb: "100% pure soya goodness.",
    category: "oils",
    // Only the 5 litre is stocked, and it is the translucent jerrycan with the
    // heart label, not the ribbed bottle the portfolio also pictures.
    sizes: ["5 litres"],
    image: "winners-soya-oil.jpg",
    art: "jug",
    colour: "#F5D547",
  },

  {
    id: "knorr",
    name: "Knorr",
    brand: "Knorr",
    blurb: "Rich flavour, real goodness.",
    category: "seasoning",
    chooseLabel: "Type",
    sizes: [
      { group: "Cubes", options: ["Chicken cubes", "Beef cubes"] },
      { group: "Powder and spice", options: ["Seasoning powder", "Jollof spice"] },
    ],
    image: "knorr-chicken-cubes.jpg",
    art: "box",
    colour: "#1B7A3E",
  },
  {
    id: "laziz-cubes",
    name: "Laziz Seasoning Cubes",
    brand: "Laziz",
    blurb: "The secret flavour boost.",
    category: "seasoning",
    chooseLabel: "Type",
    sizes: ["Chicken, 100 x 20", "Beef, 100 x 20"],
    image: "laziz-cubes-chicken.jpg",
    images: {
      "Chicken, 100 x 20": "laziz-cubes-chicken.jpg",
      "Beef, 100 x 20": "laziz-cubes-beef.jpg",
    },
    art: "box",
    colour: "#F2C200",
  },

  {
    id: "laziz-ketchup",
    name: "Laziz Tomato Ketchup",
    brand: "Laziz",
    blurb: "Rich tomato, bold taste.",
    category: "sauces",
    sizes: ["500ml"],
    image: "laziz-ketchup.jpg",
    art: "bottle",
    colour: "#D42027",
  },
  {
    id: "laziz-mayonnaise",
    name: "Laziz Mayonnaise",
    brand: "Laziz",
    blurb: "Creamy goodness, every time.",
    category: "sauces",
    sizes: ["946ml"],
    image: "laziz-mayonnaise.jpg",
    art: "jar",
    colour: "#F7F1DC",
  },
  {
    id: "laziz-salad-cream",
    name: "Laziz Salad Cream",
    brand: "Laziz",
    blurb: "Creamy, delicious, perfect.",
    category: "sauces",
    sizes: ["250ml"],
    image: "laziz-salad-cream.jpg",
    art: "jar",
    colour: "#FBF6E3",
  },

  {
    id: "checkers-custard",
    name: "Checkers Custard Powder",
    brand: "Checkers",
    blurb: "Smooth, creamy, simply delicious.",
    category: "breakfast",
    chooseLabel: "Flavour",
    sizes: [
      { group: "Vanilla", options: ["Vanilla 2kg", "Vanilla 1kg", "Vanilla 400g"] },
      { group: "3n1 Milk", options: ["3n1 Milk 1.5kg", "3n1 Milk 1kg", "3n1 Milk 400g"] },
      { group: "Banana", options: ["Banana 2kg", "Banana 1kg", "Banana 400g"] },
    ],
    image: "checkers-custard.jpg",
    art: "box",
    colour: "#1F5FA8",
  },
];


/* ==========================================================================
   Machinery below. You should not need to edit past this line.
   ========================================================================== */


/* --------------------------------------------------------------------------
   3. Placeholder artwork
   Draws a simple on brand shape so a card never looks empty while you are
   still gathering real product photos.
   -------------------------------------------------------------------------- */

function placeholderArt(product) {
  const c = product.colour;
  const cap = "#0B4023";
  const shapes = {
    jug: `
      <rect x="58" y="34" width="26" height="16" rx="5" fill="${cap}"/>
      <path d="M46 50h50a14 14 0 0 1 14 14v78a14 14 0 0 1-14 14H46a14 14 0 0 1-14-14V64a14 14 0 0 1 14-14z" fill="${c}"/>
      <path d="M110 74h12a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12h-12" fill="none" stroke="${c}" stroke-width="9"/>
      <rect x="42" y="82" width="58" height="40" rx="6" fill="#fff" opacity=".85"/>`,
    bottle: `
      <rect x="62" y="26" width="24" height="18" rx="5" fill="${cap}"/>
      <path d="M64 44h20l12 26v72a12 12 0 0 1-12 12H64a12 12 0 0 1-12-12V70z" fill="${c}"/>
      <rect x="52" y="86" width="44" height="40" rx="6" fill="#fff" opacity=".85"/>`,
    jar: `
      <rect x="40" y="46" width="68" height="18" rx="6" fill="${cap}"/>
      <path d="M44 64h60a10 10 0 0 1 10 10v58a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10V74a10 10 0 0 1 10-10z" fill="${c}" stroke="#D9CDA6" stroke-width="2"/>
      <rect x="42" y="84" width="64" height="36" rx="6" fill="#fff" opacity=".9"/>`,
    box: `
      <path d="M42 44h64a8 8 0 0 1 8 8v90a8 8 0 0 1-8 8H42a8 8 0 0 1-8-8V52a8 8 0 0 1 8-8z" fill="${c}"/>
      <path d="M42 44h64a8 8 0 0 1 8 8v6H34v-6a8 8 0 0 1 8-8z" fill="#fff" opacity=".22"/>
      <rect x="44" y="78" width="60" height="34" rx="5" fill="#fff" opacity=".92"/>
      <rect x="56" y="120" width="36" height="7" rx="3.5" fill="#fff" opacity=".45"/>`,
  };

  return `<svg viewBox="0 0 148 172" role="img" aria-hidden="true">
      <ellipse cx="74" cy="158" rx="46" ry="7" fill="#0B4023" opacity=".12"/>
      ${shapes[product.art] || shapes.box}
    </svg>`;
}


/* --------------------------------------------------------------------------
   3b. Stock and prices, read from a Google Sheet
   --------------------------------------------------------------------------
   The shop keeps one sheet with a row per item. The site reads it on load, so
   staff can mark something out of stock or change a price from a phone with no
   code and no deploy.

   Nothing here is required. If the sheet is missing, unreachable, empty or
   malformed, every product simply shows as normal with no price. A shop that
   looks ordinary is a far better failure than a shop that looks broken or,
   worse, wrongly promises something is in stock.
   -------------------------------------------------------------------------- */

// Keyed by product id, and by "id|size" for a single size.
const stockInfo = new Map();

function stockKey(id, size) {
  return size ? id + "|" + size : id;
}

/* Splits a line of CSV, respecting quotes, because product names and sizes
   contain commas: "Chicken, 100 x 20" is one field, not two. */
function parseCsvLine(line) {
  const out = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { field += '"'; i++; }  // an escaped quote
        else inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(field); field = "";
    } else {
      field += ch;
    }
  }

  out.push(field);
  return out.map((f) => f.trim());
}

function parseCsv(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map(parseCsvLine);
}

// Anything a person might reasonably type to mean "we have run out".
function meansOutOfStock(value) {
  return ["yes", "y", "true", "1", "x", "out", "no stock"].includes(
    String(value || "").trim().toLowerCase()
  );
}

async function loadStockSheet() {
  if (!CONFIG.stockSheetUrl) return;

  let rows;
  try {
    const res = await fetch(CONFIG.stockSheetUrl, { cache: "no-store" });
    if (!res.ok) return;
    rows = parseCsv(await res.text());
  } catch (err) {
    return; // Offline, or the sheet was unpublished. Carry on as normal.
  }

  if (rows.length < 2) return;

  // Find the columns by heading, so the sheet can be reordered or have extra
  // columns added without breaking anything.
  const heads = rows[0].map((h) => h.toLowerCase());
  const col = (...names) => heads.findIndex((h) => names.some((n) => h.includes(n)));

  const idCol = col("id");
  const sizeCol = col("size", "option");
  const outCol = col("out of stock", "out", "sold");
  // "carton price" has to be looked for before plain "price", otherwise the
  // loose match would claim the carton column for the single price.
  const cartonPriceCol = heads.findIndex((h) => h.includes("carton price"));
  const cartonQtyCol = heads.findIndex((h) => h.includes("carton qty") || h.includes("per carton"));
  const priceCol = heads.findIndex((h, i) => h.includes("price") && i !== cartonPriceCol);

  if (idCol === -1) return; // Without an id column there is nothing to match on.

  for (const row of rows.slice(1)) {
    const id = row[idCol];
    if (!id) continue;

    const size = sizeCol === -1 ? "" : row[sizeCol];
    const entry = {
      out: outCol !== -1 && meansOutOfStock(row[outCol]),
      price: priceCol === -1 ? "" : row[priceCol],
      cartonPrice: cartonPriceCol === -1 ? "" : row[cartonPriceCol],
      cartonQty: cartonQtyCol === -1 ? "" : row[cartonQtyCol],
    };

    stockInfo.set(stockKey(id, size), entry);
  }
}

/* Turns what somebody typed in the sheet into a number we can add up.
   "₦12,500" and "12500" and "N12,500.00" all become 12500.

   Returns null when there is no usable number, which is treated as "no price"
   rather than as zero. Charging somebody zero because a cell was untidy would
   be a great deal worse than showing no price at all. */
function priceToNumber(text) {
  if (!text) return null;

  const digits = String(text).replace(/[^0-9.]/g, "");
  if (!digits) return null;

  const value = Number(digits);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/* What to show for one product at one size. A size specific row wins over a
   whole product row, so you can mark just the 25 litre as finished. */
function stockFor(id, size) {
  const exact = size ? stockInfo.get(stockKey(id, size)) : null;
  const whole = stockInfo.get(id);
  const pick = (field) => (exact && exact[field]) || (whole && whole[field]) || "";

  const price = pick("price");
  const cartonPrice = pick("cartonPrice");
  const cartonAmount = priceToNumber(cartonPrice);
  const cartonQty = priceToNumber(pick("cartonQty"));

  return {
    out: Boolean((exact && exact.out) || (whole && whole.out)),
    price: price,
    amount: priceToNumber(price),
    // A carton only counts as available to buy if it has a price of its own.
    // Without one there is nothing to charge, so the option is not offered.
    cartonPrice: cartonPrice,
    cartonAmount: cartonAmount,
    cartonQty: cartonQty,
    hasCarton: cartonAmount !== null,
  };
}

/* Price and wording for one choice on a card: a single, or a whole carton. */
function packInfo(id, size, pack) {
  const info = stockFor(id, size);

  if (pack === "carton" && info.hasCarton) {
    return {
      amount: info.cartonAmount,
      display: info.cartonPrice,
      label: info.cartonQty ? "Carton of " + info.cartonQty : "Carton",
    };
  }

  return { amount: info.amount, display: info.price, label: "Single" };
}

/* Naira for display. The sheet's own wording is used wherever there is one,
   so the shop controls exactly how prices read. This is only for totals the
   site works out itself. */
function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}


/* --------------------------------------------------------------------------
   4. Cart
   The cart is a plain array kept in memory and mirrored into localStorage so
   it survives a page refresh. Each line is identified by product id plus size,
   because 5 litres and 1 litre of the same oil are different lines.
   -------------------------------------------------------------------------- */

const STORAGE_KEY = "aps-cart-v1";

let cart = loadCart();

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    /* Private browsing can block storage. The cart still works in memory. */
  }
}

/* A basket line is identified by product, size and whether it is a single or a
   carton, because all three change what the customer receives and pays. */
function lineKey(id, size, pack) {
  return id + "|" + (size || "") + "|" + (pack || "single");
}

function addToCart(id, size, pack) {
  const key = lineKey(id, size, pack);
  const existing = cart.find((line) => lineKey(line.id, line.size, line.pack) === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, size: size || "", pack: pack || "single", qty: 1 });
  }

  saveCart();
  renderCart();
  bumpCartButton();
}

function changeQty(key, delta) {
  const line = cart.find((item) => lineKey(item.id, item.size, item.pack) === key);
  if (!line) return;

  line.qty += delta;
  if (line.qty <= 0) {
    cart = cart.filter((item) => lineKey(item.id, item.size, item.pack) !== key);
  }

  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function cartCount() {
  return cart.reduce((total, line) => total + line.qty, 0);
}

/* Adds the basket up.

   A basket can only be paid for if every single line has a price and none of
   them is sold out. If one item is missing a price we do not quietly leave it
   out and charge for the rest, because the customer would pay a total that
   does not match what they are expecting to receive. Instead the whole basket
   falls back to asking us, and `blockedBy` says which items caused it. */
function cartTotal() {
  let total = 0;
  const noPrice = [];
  const soldOut = [];

  for (const line of cart) {
    const product = PRODUCTS.find((p) => p.id === line.id);
    if (!product) continue;

    const info = stockFor(line.id, line.size);
    const pack = packInfo(line.id, line.size, line.pack);
    const label = lineLabel(line);

    if (info.out) soldOut.push(label);
    else if (pack.amount === null) noPrice.push(label);
    else total += pack.amount * line.qty;
  }

  return {
    total: total,
    payable: cart.length > 0 && noPrice.length === 0 && soldOut.length === 0,
    noPrice: noPrice,
    soldOut: soldOut,
  };
}

/* How one basket line reads: product, size, and whether it is a carton. */
function lineLabel(line) {
  const product = PRODUCTS.find((p) => p.id === line.id);
  const name = product ? product.name : line.id;
  const withSize = line.size ? name + " (" + line.size + ")" : name;
  const pack = packInfo(line.id, line.size, line.pack);

  return line.pack === "carton" ? withSize + ", " + pack.label : withSize;
}

/* The order written down for the shop, one item per line. */
function orderSummary() {
  return cart
    .map(function (line) {
      const pack = packInfo(line.id, line.size, line.pack);
      const money = pack.amount === null ? "" : "  " + formatNaira(pack.amount * line.qty);
      return lineLabel(line) + " x" + line.qty + money;
    })
    .join("\n");
}


/* --------------------------------------------------------------------------
   5. WhatsApp links
   -------------------------------------------------------------------------- */

function whatsappLink(message) {
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}


/* The Paystack page with the total already filled in.

   The amount goes in as NAIRA. Rounded to a whole naira because Paystack
   rejects odd fractions and nobody prices groceries in kobo. */
function paystackLink(total) {
  return CONFIG.paystackPageUrl + "?amount=" + Math.round(total);
}

/* Writes the order into a Google Sheet through a Google Form, so the shop can
   see what a payment was for. Paystack only reports who paid and how much.

   Sent with no-cors, which means the browser will not let us read the reply.
   That is fine: there is nothing useful in it, and the submission still lands.
   It also means a failure here can never block the customer from paying, which
   is the right way round. Taking the money matters more than the paperwork,
   and the phone number gives the shop a way to reach them either way. */
function recordOrder(phone, total) {
  const url = CONFIG.orderFormUrl;
  const fields = CONFIG.orderFormFields || {};
  if (!url || !fields.phone) return Promise.resolve(false);

  const body = new URLSearchParams();
  body.append(fields.phone, phone);
  if (fields.order) body.append(fields.order, orderSummary());
  if (fields.total) body.append(fields.total, formatNaira(Math.round(total)));

  return fetch(url, { method: "POST", mode: "no-cors", body: body })
    .then(() => true)
    .catch(() => false);
}

function backInStockMessage(product, size) {
  const withSize = size ? product.name + " (" + size + ")" : product.name;
  return (
    "Hello African Pride Stores, is " +
    withSize +
    " back in stock? Please let me know when you have it."
  );
}

/* Used only when the basket cannot be totalled, so the customer can ask about
   the items rather than being stuck. Ordering itself happens through Paystack. */
function priceEnquiryMessage() {
  const lines = cart.map(function (line, index) {
    const product = PRODUCTS.find((p) => p.id === line.id);
    const name = product ? product.name : line.id;
    const withSize = line.size ? name + " (" + line.size + ")" : name;
    return index + 1 + ". " + withSize + " x" + line.qty;
  });

  return (
    "Hello African Pride Stores, please can you tell me the price for:\n\n" +
    lines.join("\n")
  );
}


/* --------------------------------------------------------------------------
   6. Rendering the product grid
   -------------------------------------------------------------------------- */

const grid = document.getElementById("product-grid");

// One function per card, called again once the stock sheet arrives so the
// cards can update without being rebuilt.
const cardRefreshers = [];

/* Builds the contents of a size dropdown from either form of the sizes list.
   A plain string becomes one option. A group becomes a heading with its own
   options underneath.

   The value of an option is always the full text, because that is what the
   basket and the WhatsApp message need. The visible label drops the group name
   when the option already starts with it, so the shopper sees "2kg" under the
   "Vanilla" heading rather than "Vanilla 2kg". */
function sizeOptionsHtml(sizes) {
  return sizes
    .map(function (entry) {
      if (typeof entry === "string") {
        return `<option value="${entry}">${entry}</option>`;
      }

      const prefix = entry.group + " ";
      const options = entry.options
        .map(function (option) {
          const label = option.startsWith(prefix) ? option.slice(prefix.length) : option;
          return `<option value="${option}">${label}</option>`;
        })
        .join("");

      return `<optgroup label="${entry.group}">${options}</optgroup>`;
    })
    .join("");
}

/* Which group a choice belongs to, or null for a plain ungrouped list.
   Used so one photo can cover every size of a flavour. */
function groupForOption(product, option) {
  for (const entry of product.sizes) {
    if (typeof entry !== "string" && entry.options.includes(option)) {
      return entry.group;
    }
  }
  return null;
}

/* The photo to show for the chosen option. Tries the exact choice, then the
   group it belongs to, then the product's default photo. */
function imageForOption(product, option) {
  const map = product.images || {};
  if (option && map[option]) return map[option];

  const group = groupForOption(product, option);
  if (group && map[group]) return map[group];

  return product.image;
}

function productCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = product.category;

  const hasSizes = product.sizes.length > 0;
  const sizeOptions = sizeOptionsHtml(product.sizes);
  const chooseLabel = product.chooseLabel || "Size";

  // Whichever choice the dropdown opens on, so the card starts on the matching
  // photo rather than swapping the moment someone touches it.
  const firstEntry = product.sizes[0];
  const firstOption = !firstEntry
    ? ""
    : typeof firstEntry === "string"
    ? firstEntry
    : firstEntry.options[0];

  card.innerHTML = `
    <div class="card__media">
      <span class="card__badge" hidden>Out of stock</span>
      <div class="card__art">${placeholderArt(product)}</div>
      <img src="images/${imageForOption(product, firstOption)}" alt="${product.name}"
           loading="lazy" onerror="this.classList.add('is-missing')">
    </div>

    <div class="card__body">
      <p class="card__brand">${product.brand}</p>
      <h3 class="card__name">${product.name}</h3>
      <p class="card__blurb">${product.blurb}</p>

      ${
        hasSizes
          ? `<label class="card__size">
               <span>${chooseLabel}</span>
               <select aria-label="Choose ${chooseLabel.toLowerCase()} for ${product.name}">${sizeOptions}</select>
             </label>`
          : `<p class="card__size card__size--single">One standard size</p>`
      }

      <!-- Only shown when the sheet gives a carton price for this size. -->
      <label class="card__size card__pack" hidden>
        <span>Buy</span>
        <select aria-label="Single or carton of ${product.name}">
          <option value="single">Single</option>
          <option value="carton">Carton</option>
        </select>
      </label>

      <p class="card__price"></p>

      <div class="card__actions">
        <button class="btn btn--add" type="button">Add to basket</button>
        <!-- Only appears when the item has sold out, so the customer can ask
             to be told when it returns. Ordering happens through the basket. -->
        <a class="btn btn--wa" href="#" target="_blank" rel="noopener" hidden
           aria-label="Ask about ${product.name} on WhatsApp">
          ${whatsappIcon()} <span class="btn__label">Ask when it's back</span>
        </a>
      </div>
    </div>
  `;

  const select = card.querySelector("select");
  const chosenSize = () => (select ? select.value : "");

  // Only used to ask about a sold out item. See refreshStock below.
  const waLink = card.querySelector(".btn--wa");

  /* Swap the photo to match the chosen size.

     The new photo is loaded out of sight first. Only once it has arrived do we
     put it on screen, so the card never flashes empty, and a size with no photo
     of its own simply keeps showing the one already there. */
  const photo = card.querySelector(".card__media img");
  const showPhotoFor = (option) => {
    if (!photo) return;

    const next = "images/" + imageForOption(product, option);
    if (photo.getAttribute("src") === next) return;

    const probe = new Image();
    probe.onload = function () {
      photo.setAttribute("src", next);
      photo.classList.remove("is-missing");
    };
    probe.src = next;
  };

  /* Reflects the sheet: the price for this size, and whether it has run out.

     When something is sold out we do not simply disable the WhatsApp button
     and leave the customer at a dead end. The button becomes "Ask when it's
     back", which keeps a conversation going instead of losing the sale. */
  const badge = card.querySelector(".card__badge");
  const priceEl = card.querySelector(".card__price");
  const addBtn = card.querySelector(".btn--add");
  const packField = card.querySelector(".card__pack");
  const packSelect = packField.querySelector("select");
  const chosenPack = () => packSelect.value;

  function refreshStock() {
    const size = chosenSize();
    const info = stockFor(product.id, size);

    card.classList.toggle("is-out", info.out);
    badge.hidden = !info.out;

    /* The carton choice only appears where there is a carton price, and its
       wording carries how many are in it, so "Carton of 4" rather than a bare
       "Carton" that leaves the customer guessing what they are buying. */
    packField.hidden = !info.hasCarton || info.out;
    if (info.hasCarton) {
      packSelect.options[1].textContent =
        (info.cartonQty ? "Carton of " + info.cartonQty : "Carton") +
        (info.cartonPrice ? "  " + info.cartonPrice : "");
      packSelect.options[0].textContent =
        "Single" + (info.price ? "  " + info.price : "");
    } else {
      packSelect.value = "single";
    }

    const pack = packInfo(product.id, size, chosenPack());

    /* Both prices are shown at once rather than only the selected one. This is
       a wholesale business, so a buyer needs the carton price without having to
       open a dropdown to find it, while a walk in customer still sees the
       single price and is not frightened off by a carton figure. */
    if (info.out) {
      priceEl.textContent = "Currently out of stock";
    } else if (info.hasCarton && info.price) {
      const cartonWords = info.cartonQty ? "carton of " + info.cartonQty : "carton";
      priceEl.innerHTML =
        '<span class="price-part' + (chosenPack() === "single" ? " is-chosen" : "") + '">' +
        info.price + " <em>single</em></span>" +
        '<span class="price-part' + (chosenPack() === "carton" ? " is-chosen" : "") + '">' +
        info.cartonPrice + " <em>" + cartonWords + "</em></span>";
    } else {
      priceEl.textContent = pack.display || CONFIG.noPriceText;
    }

    addBtn.disabled = info.out;

    // The WhatsApp button is only for asking about something sold out.
    waLink.hidden = !info.out;
    if (info.out) waLink.href = whatsappLink(backInStockMessage(product, size));

    // Flag sold out sizes in the dropdown itself, so a customer can see what
    // else is available without clicking through every option.
    if (select) {
      for (const option of select.options) {
        const soldOut = stockFor(product.id, option.value).out;
        const base = option.dataset.label || option.textContent;
        option.dataset.label = base;
        option.textContent = soldOut ? base + " (out of stock)" : base;
      }
    }
  }

  if (select) {
    select.addEventListener("change", function () {
      refreshStock();
      showPhotoFor(select.value);
    });
  }

  packSelect.addEventListener("change", refreshStock);

  addBtn.addEventListener("click", function () {
    if (this.disabled) return;
    addToCart(product.id, chosenSize(), chosenPack());
    flashButton(this, "Added");
  });

  refreshStock();
  cardRefreshers.push(refreshStock);

  return card;
}

function renderProducts() {
  grid.innerHTML = "";
  cardRefreshers.length = 0;
  PRODUCTS.forEach((product) => grid.appendChild(productCard(product)));
}


/* --------------------------------------------------------------------------
   7. Category filter
   -------------------------------------------------------------------------- */

function setupFilters() {
  const chips = document.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("is-active"));
      this.classList.add("is-active");

      const wanted = this.dataset.filter;
      document.querySelectorAll(".card").forEach((card) => {
        const show = wanted === "all" || card.dataset.category === wanted;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}


/* --------------------------------------------------------------------------
   8. Rendering the cart drawer
   -------------------------------------------------------------------------- */

const drawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");
const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const cartFooter = document.getElementById("cart-footer");
const cartCountEl = document.getElementById("cart-count");
const cartTotals = document.getElementById("cart-totals");
const cartTotalValue = document.getElementById("cart-total-value");
const cartBlocked = document.getElementById("cart-blocked");
const cartPhoneField = document.getElementById("cart-phone-field");
const cartPhone = document.getElementById("cart-phone");
const cartPayBtn = document.getElementById("cart-pay");
const cartPayAmount = document.getElementById("cart-pay-amount");
const cartAskBtn = document.getElementById("cart-ask");

/* The money line under a basket item: what it costs, or why it cannot be
   counted. Says "sold out" and "no price" plainly rather than showing 0. */
function cartLineNote(line) {
  const info = stockFor(line.id, line.size);
  const pack = packInfo(line.id, line.size, line.pack);

  if (info.out) return "Sold out";
  if (pack.amount === null) return "Price on request";

  const each = line.qty > 1 ? formatNaira(pack.amount) + " each &middot; " : "";
  return each + "<strong>" + formatNaira(pack.amount * line.qty) + "</strong>";
}

function renderCart() {
  const count = cartCount();
  cartCountEl.textContent = count;
  cartCountEl.classList.toggle("is-visible", count > 0);

  cartEmpty.hidden = count > 0;
  cartFooter.hidden = count === 0;
  cartList.innerHTML = "";

  cart.forEach((line) => {
    const product = PRODUCTS.find((p) => p.id === line.id);
    if (!product) return;

    const key = lineKey(line.id, line.size, line.pack);
    const packLabel =
      line.pack === "carton" ? packInfo(line.id, line.size, "carton").label : "";
    const item = document.createElement("li");
    item.className = "cart-item";
    item.innerHTML = `
      <div class="cart-item__art">${placeholderArt(product)}</div>
      <div class="cart-item__text">
        <p class="cart-item__name">${product.name}</p>
        ${line.size ? `<p class="cart-item__size">${line.size}</p>` : ""}
        ${packLabel ? `<p class="cart-item__pack">${packLabel}</p>` : ""}
        <p class="cart-item__money">${cartLineNote(line)}</p>
      </div>
      <div class="cart-item__qty">
        <button type="button" data-step="-1" aria-label="Reduce quantity">&minus;</button>
        <span>${line.qty}</span>
        <button type="button" data-step="1" aria-label="Increase quantity">+</button>
      </div>
    `;

    item.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => changeQty(key, Number(btn.dataset.step)));
    });

    cartList.appendChild(item);
  });

  refreshTotals();
}

/* Shows the total, and decides whether the basket can be paid for at all. */
function refreshTotals() {
  const sums = cartTotal();

  cartTotalValue.textContent = formatNaira(Math.round(sums.total));
  cartPayAmount.textContent = formatNaira(Math.round(sums.total));
  cartPayBtn.href = paystackLink(sums.total);

  // Say plainly what is wrong rather than showing a total that is not real.
  let problem = "";
  if (sums.soldOut.length) {
    problem =
      "Please remove " + sums.soldOut.join(", ") + ". It has sold out.";
  } else if (sums.noPrice.length) {
    problem =
      "We do not have a price on the site for " +
      sums.noPrice.join(", ") +
      ". Send us a message and we will tell you the cost.";
  }

  cartBlocked.hidden = !problem;
  cartBlocked.textContent = problem;

  cartAskBtn.hidden = !problem;
  if (problem) cartAskBtn.href = whatsappLink(priceEnquiryMessage());

  cartTotals.hidden = !sums.payable;
  cartPayBtn.hidden = !sums.payable;
  cartPhoneField.hidden = !sums.payable;
}

function openCart() {
  drawer.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.classList.add("no-scroll");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  drawer.setAttribute("aria-hidden", "true");
}


/* --------------------------------------------------------------------------
   9. Small interface touches
   -------------------------------------------------------------------------- */

function flashButton(button, text) {
  const original = button.textContent;
  button.textContent = text;
  button.classList.add("is-done");

  setTimeout(function () {
    button.textContent = original;
    button.classList.remove("is-done");
  }, 900);
}

function bumpCartButton() {
  const btn = document.getElementById("cart-button");
  btn.classList.remove("is-bumped");
  void btn.offsetWidth; // Forces the browser to restart the animation.
  btn.classList.add("is-bumped");
}

function whatsappIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="wa-icon">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.58.25 1.04.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
    </svg>`;
}


/* --------------------------------------------------------------------------
   10. Start everything
   -------------------------------------------------------------------------- */

function init() {
  // Fill in the contact details from CONFIG so there is one place to change them.
  document.querySelectorAll("[data-phone]").forEach((el) => {
    el.textContent = CONFIG.phoneDisplay;
  });
  document.querySelectorAll("[data-wa-general]").forEach((el) => {
    el.href = whatsappLink(
      "Hello African Pride Stores, I would like to make an enquiry."
    );
  });
  document.querySelectorAll("[data-wa-bulk]").forEach((el) => {
    el.href = whatsappLink(
      "Hello African Pride Stores, I would like a quote for a bulk order."
    );
  });
  document.querySelectorAll("[data-tel]").forEach((el) => {
    el.href = "tel:+" + CONFIG.whatsappNumber;
  });

  renderProducts();
  setupFilters();
  renderCart();

  document.getElementById("cart-button").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-clear").addEventListener("click", clearCart);
  overlay.addEventListener("click", closeCart);

  /* Paying. The order is written down first so the shop can tell what the
     money is for, then the customer is handed to Paystack.

     The recording is given a short head start but is never allowed to hold
     anyone up: if the form is slow or broken we go to Paystack anyway. A
     customer blocked from paying is a worse outcome than a missing row in a
     spreadsheet, and the phone number reaches them either way. */
  cartPayBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const sums = cartTotal();
    if (!sums.payable) return;

    const phone = cartPhone.value.trim();
    if (phone.replace(/\D/g, "").length < 10) {
      cartPhone.focus();
      cartPhoneField.classList.add("is-invalid");
      return;
    }
    cartPhoneField.classList.remove("is-invalid");

    const target = paystackLink(sums.total);
    const go = () => window.open(target, "_blank", "noopener");

    Promise.race([
      recordOrder(phone, sums.total),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]).then(go, go);
  });

  cartPhone.addEventListener("input", function () {
    cartPhoneField.classList.remove("is-invalid");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeCart();
  });

  // Mobile navigation.
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-links");
  navToggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });

  // Shrink the header once the page scrolls.
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("is-stuck", window.scrollY > 20);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* The stock sheet is fetched after the page is already usable, so a slow or
     unreachable sheet never delays the products appearing. When it arrives the
     cards update themselves in place. */
  loadStockSheet().then(function () {
    cardRefreshers.forEach((refresh) => refresh());
  });
}

init();
