# Stock and prices

The shop controls prices and what is sold out from **one Google Sheet**. Nobody
needs to touch code, and there is nothing to deploy. Tick a box on your phone
and the website follows within a few minutes.

## The one rule worth keeping

**Only ever mark things OUT of stock. Never promise something is in stock.**

The site says nothing at all about availability unless you mark an item sold
out. That way you never break a promise. If a customer orders something you
have just run out of, you sort it out on WhatsApp exactly as you do today. But
if the site had said "In stock" and you did not have it, you would have spent
trust that is hard to earn back.

Same with prices. Leave the price blank and the card falls back to
"Call or chat for today's price", which is always true.

## Setting it up, once

### 1. Make the sheet

Create a new Google Sheet with these five column headings in row 1:

| id | Product | Size | Out of stock | Price |
| --- | --- | --- | --- | --- |

- **id** is the only column the website matches on. It has to be exact. The
  list is below.
- **Product** is for you, so the sheet is readable. The website ignores it.
- **Size** must match the wording in the dropdown exactly. Leave it blank to
  mean the whole product, every size.
- **Out of stock** takes `yes`, `y`, `true`, `1` or `x`. Anything else, blank
  included, means available.
- **Price** is shown exactly as you type it, so write it how you want it read,
  for example `₦12,500`. Leave blank to say nothing.

### 2. Publish it

In the sheet: **File**, then **Share**, then **Publish to web**.

- Choose the sheet tab, and choose **Comma separated values (.csv)**
- Press **Publish** and copy the address it gives you

This is different from the normal Share link. It has to be the publish link,
and it must end in `output=csv`.

### 3. Paste it into the site

Open `script.js`, find `CONFIG` at the top, and put the address in:

```js
stockSheetUrl: "https://docs.google.com/spreadsheets/d/e/..../pub?output=csv",
```

Commit and push that one line. After that you never touch the code again.

## Using it day to day

- Sold out: put `yes` in the **Out of stock** column for that row.
- Back in: clear that cell.
- Price change: type the new price.

Changes appear on the site within a few minutes. Google caches the published
sheet briefly, so it is not instant.

## What a customer sees when something is sold out

- An **Out of stock** badge on the photo, and the photo dims
- The size is labelled `(out of stock)` in the dropdown, so they can see what
  else is available without clicking through
- **Add to basket** is greyed out
- The WhatsApp button becomes **Ask when it's back**, and sends you a message
  asking to be told when it returns. A sold out item becomes a lead rather
  than a dead end.

## If something goes wrong

If the sheet is unpublished, deleted, renamed, unreachable, or full of
nonsense, the website carries on as if there were no sheet: every product
available, no prices, no badges. It cannot take the shop offline and it cannot
wrongly mark something sold out. That is deliberate.

To switch the whole thing off, set `stockSheetUrl` back to `""`.

## The ids and sizes

Copy these exactly.

| id | Product | Sizes |
| --- | --- | --- |
| `laziz-vegetable-oil` | Laziz Vegetable Oil | 5 litres, 3 litres, 1.6 litres, 1 litre, 750ml |
| `laziz-premium-oil` | Laziz Premium Vegetable Oil | 5 litres, 3 litres |
| `active-gold` | Active Gold | 5 litres, 3 litres |
| `active-vegetable-oil` | Active Vegetable Oil | 25 litres, 5 litres, 3 litres |
| `winners-soya-oil` | Winners Soya Oil | 5 litres |
| `knorr` | Knorr | Chicken cubes, Beef cubes, Seasoning powder, Jollof spice |
| `laziz-cubes` | Laziz Seasoning Cubes | Chicken, 100 x 20 / Beef, 100 x 20 |
| `laziz-ketchup` | Laziz Tomato Ketchup | 500ml |
| `laziz-mayonnaise` | Laziz Mayonnaise | 946ml |
| `laziz-salad-cream` | Laziz Salad Cream | 250ml |
| `checkers-custard` | Checkers Custard Powder | Vanilla 2kg, Vanilla 1kg, Vanilla 400g, 3n1 Milk 1.5kg, 3n1 Milk 1kg, 3n1 Milk 400g, Banana 2kg, Banana 1kg, Banana 400g |

Two sizes contain a comma: `Chicken, 100 x 20` and `Beef, 100 x 20`. Type them
into the cell normally. Google handles the quoting when it publishes, and the
site reads it correctly.

## Example

| id | Product | Size | Out of stock | Price |
| --- | --- | --- | --- | --- |
| laziz-vegetable-oil | Laziz Vegetable Oil | 5 litres | | ₦12,500 |
| laziz-vegetable-oil | Laziz Vegetable Oil | 750ml | yes | ₦2,300 |
| active-gold | Active Gold | | yes | |
| knorr | Knorr | | | ₦5,000 |

That sheet means: the 5 litre Laziz oil costs ₦12,500 and is available, the
750ml has run out, all of Active Gold has run out, and every Knorr type costs
₦5,000. Anything not listed at all behaves normally.
