# Code Guidelines

You will be expected to follow this list of code practices and guidelines in your assessments for this unit.

These guidelines are mostly a derivative of [GitHub's code guidelines](http://primercss.io/guidelines/). In most professional workplaces, there are coding standards and the following is the standard for assignment 1a and 1b, you **will be marked** on your _ability to follow them_ and demonstrate a professional practice skill.

## HTML

- Use the HTML5 doctype `<!doctype html>`
  - This should be the first line of each html file
- Attempt to use HTML5 structural elements when appropriate
- Only images that are part of the site's content should be included in your markup
  - Other images should be CSS background images
- Paragraphs of text should be placed inside `<p>` tags, never use multiple `<br>` tags.
- Items in list form should always be in `<ul>`, `<ol>`, or `<dl>`. Never use a set of `<div>` or `<p>`.
- Every form input that has text attached should utilize a `<label>` tag. Especially **radio or checkbox elements.**
- Even though quotes around attributes is optional, always put quotes around attributes for readability.
- Avoid trailing slashes in self-closing elements. For example, `<br>`, `<hr>`,`<img>`, and `<input>`
  - i.e.: Avoid this: `<br />` or `<hr />`
- HTML should validate, online HTML validation is available from the [W3C Markup Validation Service](https://validator.w3.org/)
- Make sure your site is accessible and highly usable, make use of ARIA attributes

### Lean markup

Whenever possible, avoid superfluous parent elements when writing HTML. Many times this requires iteration and refactoring, but produces less HTML. For example:

```html
<!-- Not so great -->
<span class="avatar">
  <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

### Tables

Make use of `<thead>`, `<tfoot>`, `<tbody>`, and `<th>` tags (and `scope` attribute) when appropriate.

```html
<table summary="This is a chart of invoices for 2011.">
  <thead>
    <tr>
      <th scope="col">Table header 1</th>
      <th scope="col">Table header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table data 1</td>
      <td>Table data 2</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Table footer 1</td>
      <td>Table footer 2</td>
    </tr>
  </tfoot>
</table>
```

## CSS

- Link to a single CSS file from within your **HTML**
  - Additional CSS files should be included via `@import` rules from this CSS file
- No inline CSS on elements ~~`<p style="color: red">...</p>`~~
- Do not use `<style>` tags, all styles should be external and included via a single `<link>` tag in the `<head>` of each page
- Use @media queries to help your site adjust to multiple display sizes and resolutions
- Make your CSS mobile first. Use min-width instead of max-width media queries where possible
- Use an accessible defined colour scheme


### Spacing

- Put spaces after `:` in property declarations.
- Put spaces before `{` in rule declarations.
- Put line breaks between rulesets.
- When grouping selectors, keep individual selectors to a single line.
- Place closing braces of declaration blocks on a new line.
- Each declaration should appear on its own line for more accurate error reporting.

```css
.example__one,
.example__two p {
  font-size: 18px;
  line-height: 1.3;
}

.example__three {
  font-family: sans-serif;
}
```

### Formatting

- Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`
- Strive to limit use of shorthand declarations to instances where you must explicitly set all the available values.

### Selectors

- Avoid using `ID` selectors
- Use BEM style class names
  - Classes grouped into Blocks eg: `.nav`
  - Individual items defined as elements eg: `.nav__link`
  - and optionally assigned modifiers eg: `.nav__link--current`
  - Selectors for each group of classes should live in their own file inside `css/lib` and be added to `main.css` via an `@import`
    - i.e.: all `.nav` styles live in `css/lib/nav.css`
- Spaces in class names should be replaced with a single underscore `_` eg: `.example_block`
- As a rule of thumb, avoid unnecessary long selectors. At most, aim for three levels. If you cannot help it, step back and rethink your overall strategy (either the specificity needed, or the layout of the nesting).

### Examples

```css
// Example of good basic formatting practices
.style_guide__example {
  color: #000;
  background-color: rgba(0, 0, 0, .5);
  border: 1px solid #0f0;
}

// Example of individual selectors getting their own lines (for error reporting)
.style_guide,
.style_guide__element,
.style_guide__another_element {
  display: block;
}

// Avoid unnecessary shorthand declarations
.not_so_good {
  background: red;
  font: italic normal 13px/150% Arial, Helvetica, sans-serif;
}
.good--modifier {
  background-color: red;
  font-style: italic;
  font-weight: normal;
  font-size: 13px;
  line-height: 150%;
  font-family: Arial, Helvetica, sans-serif;
}
```

## JavaScript

- Do not use attribute based event handlers
  - There should be no JavaScript code in your HTML files
- JavaScript should be unobtrusive
  - Your site shouldn't be reliant on the use of JavaScript to function
  - JavaScript should genuinely **enhance** your site
  - All JavaScript should be within `.js` files, linked to your html via the `src` attribute on `<script>` tags
  - Including `type="text/javascript"` on `<script>` when linking to a JavaScript file is optional as browsers default to `text/javascript`. Including it only increases bloat and reduces code readability.
- Attempt to use feature detection to fail gracefully where possible
- Attempt to break scripts into smaller reusable functions which handle key tasks with useful names
- Place functions declarations at the bottom of your `.js` file and logic at the top
  - This aids readability
  - Do not include logic between function declarations
- **Bonus:** Attempt to pollyfill functionality on older browsers if it is crucial to the use of your site

```html
// Linking to an external JavaScript file
<script src="js/main.js"></script>

// Optionally include the type attribute
<script src="js/main.js" type="text/javascript"></script>

// DO NOT do this
<button onclick="functionName();">Wrong</button>
```

```javascript
// Example feature detection (logic)
if(!Element.prototype.addEventListener){
  node.addEventListener(...);
}

// Function declarations at the bottom of the file
function getSomething(){
  return "something";
}

// DO NOT do this, example of logic between function declarations
var lists = document.querySelectorAll('ul');

function getSomethingElse(){
  return "something else";
 }
```

## Bonus: Pollyfills

- Include [html5shiv](https://raw.githubusercontent.com/aFarkas/html5shiv/master/dist/html5shiv.js) - allows HTML5 doctype and elements to work in old versions of IE
  - Directions available on their [GitHub Project](https://github.com/aFarkas/html5shiv)
  - If you're using [Modernizr](https://modernizr.com/), you can choose to add it to your build from the [Modernizr build tool](https://modernizr.com/download) the [Development Build](https://modernizr.com/download?do_not_use_in_production) includes it by default
- Include [respond.js](https://github.com/scottjehl/Respond/blob/master/dest/respond.min.js) - adds media query support to old browsers
  - Directions available on their [GitHub Project](https://github.com/scottjehl/Respond)

## File organisation

- Group related files into folders.
- HTML files may be stored in the project root.

```
Project root
├─ index.html
├─ contact.html
├─ css
|  ├─ main.css
|  ├─ lib
|  |  └─ nav.css
|  └─ vendor
|     └─ normalize.css
├─ js
|  ├─ main.js
|  └─ vendor
|     └─ modernizr.js
├─ images
|  └─ sample.jpg
```

- File and folder names should contain only lower-case letters, digits and hyphens. They should not contain any spaces, punctuation or special characters as they are processed differently in URLs
	- `myimage5.png` is ok
	- `my-image.png` is ok
	- `myImage.png` is not ok
	- `my image.png` is not ok
	- `image😀.png` is not ok 😥

## Libraries, frameworks, and plugins

You may find that a library, plugin, or framework you wish to use has class naming conventions or markup standards which does not adhere to this guide, that is fine.

Style sheets inside of `css/vendor` are assumed to be external libraries or frameworks and will not be held to these standards

Markup tied to frameworks, libraries, or JS plugins will not be penalised for differing from these standards. For example CSS Smart Grid does not follow the class naming convention covered here.

## Code Beautifiers

If you're using [Atom](https://atom.io/), try the [atom-beautify](https://atom.io/packages/atom-beautify) package. You can change it's settings to run on save and it will automate _most_ of the css guidelines in this document.

### Settings to change

In atom-beautify's settings, scroll to, and expand, the section on css. Change the following settings:

- Beautify on save (enable, optional)
- Indent size, change to `2`
  - By default atom-beautify uses spaces, you can change to tabs if you prefer by deleting the space inside the `indent char` field and then `copy+paste` a `tab` from another document
- Selector separator newline (enable)
