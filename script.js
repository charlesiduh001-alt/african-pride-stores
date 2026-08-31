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
  // Nigerian 0803 123 4567 becomes 2348031234567.
  // PLACEHOLDER: swap this for the real shop number.
  whatsappNumber: "2348031234567",

  // The same number written the pretty way, for display only.
  phoneDisplay: "0803 123 4567",

  // Set to true once you have real prices you are happy to publish.
  // While false, cards show a "Ask for price" style prompt instead.
  showPrices: false,
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
    art: "jug",
    colour: "#F2B705",
  },
  {
    id: "active-vegetable-oil",
    name: "Active Vegetable Oil",
    brand: "Active",
    blurb: "A healthy choice for a better you.",
    category: "oils",
    sizes: ["25 litres", "5 litres", "3 litres"],
    image: "active-vegetable-oil.jpg",
    art: "bottle",
    colour: "#E8A317",
  },
  {
    id: "winners-soya-oil",
    name: "Winners Soya Oil",
    brand: "Winners",
    blurb: "100% pure soya goodness.",
    category: "oils",
    sizes: ["5 litres", "3 litres"],
    image: "winners-soya-oil.jpg",
    art: "bottle",
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

function lineKey(id, size) {
  return id + "|" + (size || "");
}

function addToCart(id, size) {
  const key = lineKey(id, size);
  const existing = cart.find((line) => lineKey(line.id, line.size) === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, size: size || "", qty: 1 });
  }

  saveCart();
  renderCart();
  bumpCartButton();
}

function changeQty(key, delta) {
  const line = cart.find((item) => lineKey(item.id, item.size) === key);
  if (!line) return;

  line.qty += delta;
  if (line.qty <= 0) {
    cart = cart.filter((item) => lineKey(item.id, item.size) !== key);
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


/* --------------------------------------------------------------------------
   5. WhatsApp links
   -------------------------------------------------------------------------- */

function whatsappLink(message) {
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function singleItemMessage(product, size) {
  const withSize = size ? product.name + " (" + size + ")" : product.name;
  return (
    "Hello African Pride Stores, I would like to order " +
    withSize +
    ". Is it available?"
  );
}

function basketMessage() {
  const lines = cart.map(function (line, index) {
    const product = PRODUCTS.find((p) => p.id === line.id);
    const name = product ? product.name : line.id;
    const withSize = line.size ? name + " (" + line.size + ")" : name;
    return index + 1 + ". " + withSize + " x" + line.qty;
  });

  return (
    "Hello African Pride Stores, I would like to order:\n\n" +
    lines.join("\n") +
    "\n\nPlease confirm availability and the total. Thank you."
  );
}


/* --------------------------------------------------------------------------
   6. Rendering the product grid
   -------------------------------------------------------------------------- */

const grid = document.getElementById("product-grid");

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

function productCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = product.category;

  const hasSizes = product.sizes.length > 0;
  const sizeOptions = sizeOptionsHtml(product.sizes);
  const chooseLabel = product.chooseLabel || "Size";

  card.innerHTML = `
    <div class="card__media">
      <div class="card__art">${placeholderArt(product)}</div>
      <img src="images/${product.image}" alt="${product.name}"
           loading="lazy" onerror="this.remove()">
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

      ${CONFIG.showPrices ? "" : `<p class="card__price">Call or chat for today's price</p>`}

      <div class="card__actions">
        <button class="btn btn--add" type="button">Add to basket</button>
        <a class="btn btn--wa" href="#" target="_blank" rel="noopener"
           aria-label="Order ${product.name} on WhatsApp">
          ${whatsappIcon()} Order now
        </a>
      </div>
    </div>
  `;

  const select = card.querySelector("select");
  const chosenSize = () => (select ? select.value : "");

  // Keep the single item WhatsApp link in step with the chosen size.
  const waLink = card.querySelector(".btn--wa");
  const refreshLink = () => {
    waLink.href = whatsappLink(singleItemMessage(product, chosenSize()));
  };
  refreshLink();
  if (select) select.addEventListener("change", refreshLink);

  card.querySelector(".btn--add").addEventListener("click", function () {
    addToCart(product.id, chosenSize());
    flashButton(this, "Added");
  });

  return card;
}

function renderProducts() {
  grid.innerHTML = "";
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
const cartSendBtn = document.getElementById("cart-send");

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

    const key = lineKey(line.id, line.size);
    const item = document.createElement("li");
    item.className = "cart-item";
    item.innerHTML = `
      <div class="cart-item__art">${placeholderArt(product)}</div>
      <div class="cart-item__text">
        <p class="cart-item__name">${product.name}</p>
        ${line.size ? `<p class="cart-item__size">${line.size}</p>` : ""}
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

  cartSendBtn.href = whatsappLink(basketMessage());
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
}

init();
