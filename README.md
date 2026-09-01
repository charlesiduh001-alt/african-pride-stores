# African Pride Stores website

A single page shop site. Customers browse products, pick a size, then either
order one item straight away on WhatsApp or fill a basket and send the whole
list in one message.

There is no server, no database and no login. Everything runs in the visitor's
browser, which means it is free to host and there is nothing to maintain.

## Open it

Double click `index.html`. That is the whole setup.

## The three files

| File | What it holds |
| --- | --- |
| `index.html` | The page structure: header, hero, sections, footer |
| `styles.css` | All the styling and the brand colours |
| `script.js` | The products, the basket and the WhatsApp links |
| `images/` | Product photos, plus the original flyer |
| `tools/` | A script for re-cutting photos out of the flyer, see below |

The site itself is only the first three files. Nothing else is needed to run it.

## Things you will actually want to change

### 1. The phone number

Open `script.js`. The first block is `CONFIG`:

```js
whatsappNumber: "2348150709963",
phoneDisplay: "0815 070 9963",
```

`whatsappNumber` must be in international format: no plus sign, no spaces, and
no zero at the front. A Nigerian number like 0815 070 9963 becomes
2348150709963.

`phoneDisplay` is only what people read on screen, so write it however looks
best.

Change those two lines and every phone link, WhatsApp button and contact detail
on the page updates. That is the only place the number lives.

### 2. Prices

Prices are hidden by default, because grocery prices move too often to leave
sitting on a website. Cards currently say "Call or chat for today's price".

If you later want to show prices, set `showPrices: true` in `CONFIG` and add a
price to each product.

### 3. Products and sizes

Still in `script.js`, the `PRODUCTS` list holds every item. One block looks like
this:

```js
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
```

- To change sizes, edit the `sizes` list. The order you write them is the order
  the customer sees, so put the size you sell most first.
- If a product only comes one way, use `sizes: []` and the card shows
  "One standard size" instead of a dropdown.

Where one card holds a whole family of products, the `sizes` list is written in
groups instead, and each group becomes a heading inside the dropdown. That is
how the single Knorr card holds the cubes and the powders, and the single
custard card holds all three flavours with their own sizes:

```js
sizes: [
  { group: "Vanilla", options: ["Vanilla 2kg", "Vanilla 1kg", "Vanilla 400g"] },
  { group: "Banana",  options: ["Banana 2kg",  "Banana 1kg",  "Banana 400g"] },
],
```

Write each option out in full, because that full text is what lands in the
basket and the WhatsApp message. On screen the group name is trimmed off the
front, so the customer reads a tidy "2kg" under a "Vanilla" heading rather than
"Vanilla 2kg".

- `chooseLabel` sets the wording above the dropdown. It defaults to "Size", so
  only set it where "Type" or "Flavour" reads better.
- To add a product, copy a whole block, paste it, and change the values. Give it
  an `id` nothing else is using.
- `category` must match one of the filter buttons in `index.html`: `oils`,
  `seasoning`, `sauces` or `breakfast`.

### 4. Product photos

Every photo on the site was cut out of the shop flyer, which is kept as
`images/flyer-source.jpeg`. Nothing is missing a picture.

To replace one with a better shot, drop your file into the `images` folder using
the exact name listed in that product's `image` field, for example
`images/laziz-ketchup.jpg`. It appears straight away. If a file is ever missing
a drawn shape shows in its place, so the site never looks broken.

`images/README.txt` lists every file name. Square photos on a plain white
background work best.

If you ever want to re-cut the flyer photos, for example because a crop sits too
tight, the coordinates are all at the top of `tools/crop-from-flyer.ps1`. Each
line is name, left, top, width, height measured on the original 853 by 1280
flyer. Right click the file and choose "Run with PowerShell" after editing.

### 5. If the domain ever changes

The address `https://africanpridestores.com` is written into three files. Change
it in all three or search engines and link previews will point at the old one:

- `index.html`, the `canonical` link and the `og:url` and `og:image` tags near
  the top
- `robots.txt`, the Sitemap line
- `sitemap.xml`, the `loc` line

The `og:` tags are what make a pasted link show a picture and a title in
WhatsApp instead of bare text. They need the full `https://` address, not a
relative path, which is why the domain is repeated rather than looked up.

### 6. Address and opening hours

These are still placeholders. In `index.html`, search for `PLACEHOLDER` and you
will find them in the "Visit us" section.

## Putting it online

The site is plain files, so most free hosts work. The simplest is Netlify Drop:
go to <https://app.netlify.com/drop> and drag this whole folder onto the page.
You get a live link straight away.

Vercel also works if you would rather keep everything in one account.

## A note on how the basket works

The basket is kept in the browser's own storage, so it survives a refresh but
never leaves the visitor's device. Nothing is sent anywhere until they press
"Send this basket on WhatsApp", which opens WhatsApp with the order already
typed out. You confirm availability and the total in the chat, the way you
already do.
