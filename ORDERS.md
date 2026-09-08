# Knowing what people ordered

Paystack tells you **who paid and how much**. It cannot tell you what they
wanted. This connects a Google Form so every basket is written into a
spreadsheet before the customer is sent to pay.

You then match the payment to the order by **phone number and amount**.

Without this the site still works and still takes payment. You just get money
with no order attached to it, and have to ring the customer to ask.

## Setting it up, once

### 1. Make the form

Create a Google Form with exactly three **short answer** questions, in any
order:

| Question | What lands in it |
| --- | --- |
| Phone number | What the customer typed in the basket |
| Order | The list of items, one per line |
| Total | The amount, for example `₦28,750` |

Make the Order question a **paragraph** answer rather than short answer, since
it holds several lines.

Do not mark any of them required. A required question the site does not fill
in would silently reject the whole submission.

### 2. Find the three field codes

Each question has a hidden code like `entry.123456789`. To see them:

1. Open the form, press the three dots menu, choose **Get pre-filled link**
2. Type anything into all three questions, for example `1`, `2`, `3`
3. Press **Get link**, then **Copy link**
4. Paste it somewhere you can read it

The link looks like this, and the three codes are what you need:

```
https://docs.google.com/forms/d/e/1FAIpQL.../viewform?usp=pp_url
   &entry.111111111=1
   &entry.222222222=2
   &entry.333333333=3
```

Match them up by the values you typed: whichever number you put in the phone
question tells you which code is the phone code.

### 3. Get the submit address

Take that same link, cut everything from the `?` onwards, and change
`viewform` at the end to `formResponse`:

```
https://docs.google.com/forms/d/e/1FAIpQL.../formResponse
```

### 4. Put them in the site

In `script.js`, in the `CONFIG` block at the top:

```js
orderFormUrl: "https://docs.google.com/forms/d/e/1FAIpQL.../formResponse",
orderFormFields: {
  phone: "entry.111111111",
  order: "entry.222222222",
  total: "entry.333333333",
},
```

Commit and push.

### 5. See the orders

In the form, open the **Responses** tab and press the green sheets icon to send
every response into a spreadsheet. Open that on your phone and you have a live
order book, newest at the bottom.

## Testing it

Put something in the basket, enter your own phone number, and press Pay. Do not
finish the payment. Then check the responses sheet: the row should already be
there, because the order is recorded **before** the customer reaches Paystack.

That ordering is deliberate. It means you have a record even of people who
change their mind at the payment screen, which is useful to know.

## If the form breaks

Recording is given two and a half seconds, and then the customer goes to
Paystack whether it worked or not. A slow or broken form can never stop
somebody paying you.

So the failure is: money arrives with no matching row. You still have their
phone number from Paystack, so you can call and ask. Annoying, not a disaster,
and much better than losing the sale.

## Matching a payment to an order

1. Paystack tells you: `0803 111 2222 paid ₦28,750`
2. Open the responses sheet, look for that phone number
3. The row has the item list and the total
4. Check the total matches what was paid, then pack it

**Always check the amount matches before you deliver.** The payment page lets
the customer change the figure, so a wrong amount can arrive, by mistake or
otherwise. Paystack shows you what was actually paid, so this is a glance
rather than a chore.
