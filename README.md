# Leaflet.BootstrapDropdowns

A [Leaflet](https://leafletjs.com/) plugin to show [bootstrap dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/). Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [Leaflet 1 demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/index.html) or [Leaflet 2 demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/index_v2.html)
* Current Version: v1.0.4 / v2.0.0-alpha.1 (2026-02-28)
* Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

## Usage

### Leaflet 1.x (Classic)

Simply include the [JS](dist/leaflet-bootstrap-dropdowns.min.js) in the head.

```html
<head>
    ...
    <script src="dist/leaflet-bootstrap-dropdowns.min.js"></script>
    ...
</head>
```

Then create a `BootstrapDropdowns` instance and add it to the map.

```js
new L.Control.BootstrapDropdowns({
    position: "topleft",
    menuItems: [
        {
            html: 'Open Alert',
            afterClick: () => alert("Hello!")
        }
    ]
}).addTo(map);
```

### Leaflet 2.x (ESM)

For Leaflet 2.x, use the ESM-ready version [leaflet-bootstrap-dropdowns_v2.min.js](dist/leaflet-bootstrap-dropdowns_v2.min.js).

```js
import L from 'leaflet';
import BootstrapDropdowns from './dist/leaflet-bootstrap-dropdowns_v2.min.js';

new BootstrapDropdowns({
    position: "topleft",
    menuItems: [
        {
            html: 'Open Alert',
            afterClick: () => alert("Hello!")
        }
    ]
}).addTo(map);
```

For more details, refer to the [Leaflet 1 demo](index.html) or [Leaflet 2 demo](index_v2.html).

## Options

| Option | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| className | String | "" | the custom CSS class name assigned to the control |
| html | String | (SVG) | the HTML content of the button (defaults to a hamburger icon) |
| title | String | "menu" | the "title" attribute of the button |
| ariaLabel | String | "" | the "aria-label" attribute of the button. If empty, it defaults to `title`. |
| autoClose | Boolean/String | true | control the auto-close behavior ([Bootstrap docs](https://getbootstrap.com/docs/5.3/components/dropdowns/#auto-close)) |
| menuItems | Array | [] | the list of menu items to display |

### Menu Items

Each object in the `menuItems` array can have the following properties:

| Property | Type | Description |
| ---- | ---- | ---- |
| html | String | the HTML content of the menu item |
| title | String | the "title" attribute of the menu item |
| ariaLabel | String | the "aria-label" attribute. If empty, it defaults to `title`. |
| separator | Boolean | if `true`, renders a horizontal divider |
| header | Boolean | if `true`, renders the item as a non-clickable header |
| current | Boolean | if `true`, marks the item as active and prevents navigation |
| disabled | Boolean | if `true`, renders the item as disabled |
| href | String | the URL for the link. If not provided, it defaults to `#` |
| target | String | the "target" attribute of the link (e.g., `_blank`) |
| rel | String | the "rel" attribute of the link |
| afterClick | Function | a callback function to execute when the item is clicked |

## Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns)

## Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
