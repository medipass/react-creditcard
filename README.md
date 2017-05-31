# react-creditcard

> An awesome credit card component (and doesn't even use CoffeeScript!).

![](http://i.imgur.com/vZEieRx.gif)

## Motivation

Most of the card modules I've seen use CoffeeScript (and tbh I can't be bothered learning CoffeeScript to make a pull request), and some of them are not being actively maintained anymore.
So I decided to port a combination of [jessepollak](https://github.com/jessepollak)'s [card](https://github.com/jessepollak/card) and [JohnyDays](https://github.com/JohnyDays)'s [react-credit-card](https://github.com/JohnyDays/react-credit-card).

## Installation

`yarn add react-creditcard`

or

`npm install react-creditcard --save`

## Usage

```javascript
import CreditCard from 'react-creditcard';

<CreditCard
  number="4111111111111111"
  cvc="123"
  expiry="1220"
  focused="cvc"
  backDescriptionText="Use of this card is governed by the conditions of use. You must not disclose your PIN to anyone."
  />
```

## Available Props

<table>
<thead><tr><th>Prop</th><th>Type</th><th>Default value</th><th>Description</th></tr></thead>
<tbody>
  <tr><td>  number </td><td>string (optional)</td><td>null</td> <td>Card number - spaces are not needed.</td></tr>
  <tr><td>  cvc  </td><td>string (optional)</td><td>null</td> <td>Card security code</td></tr>
  <tr><td>  name  </td> <td>string (optional)</td><td>null</td> <td>Full name of card holder.</td></tr>
  <tr><td>  expiry  </td> <td>string (optional)</td><td>null</td> <td>Expiry of card - '/' is not needed. (e.g. '1220').</td></tr>
  <tr><td>  focused  </td> <td>string (optional)</td><td>null</td> <td>Focused field. (Available: 'name', 'cvc', 'expiry', 'number', null)</td></tr>
  <tr><td>  namePlaceholder  </td> <td>string (optional)</td><td>'FULL NAME'</td> <td>Placeholder for card holder name.</td></tr>
  <tr><td>  expiryBeforeText  </td> <td>string (optional)</td><td>'month/year'</td> <td>The text displayed above the expiry date.</td></tr>
  <tr><td>  expiryAfterText  </td> <td>string (optional)</td><td>'valid thru'</td> <td>The text displayed left of the expiry date.</td></tr>
  <tr><td>  backDescriptionText  </td> <td>string (optional)</td><td>null</td> <td>The text displayed on the back of the card.</td></tr>
  <tr><td>  type  </td> <td>string (optional)</td><td>null</td> <td>Available in case you need to explicitly specify the card type. In most cases this will be inferred for you as the user fills the form, so you won't need to use it. (Available: 'discover', 'mastercard', 'visa', 'amex')</td></tr>
</tbody>
</table>

## License

MIT © [Jake Moxey](https://github.com/jxom)
