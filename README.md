Leaflet.BootstrapDropdowns
=

A [Leaflet](https://leafletjs.com/) plugin to show [bootstrap dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/). Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/) 
* Current Version: v1.0.1
* Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

# Usage

Simply include the [JS](dist/leaflet-bootstrap-dropdowns.min.js) and [CSS](examples/demo.css) in the head.

```html
<head>
    ...
    <script src="dist/leaflet-bootstrap-dropdowns.min.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And add the control to the map.

```js
new L.Control.BootstrapDropdowns({
    position: "topleft",
    className: "menu",
    menuItems: [
        {
            html: '<i class="fas fa-map-marked-alt"></i> Open Street Map',
            title: "Open Street Map",
            current: true,  // current page
        },
        {
            html: '<i class="fas fa-exclamation-triangle"></i> Open Alert',
            title: "Open Alert",
            afterClick: () => {  // callback
                alert("Open Alert!");
            },
        },
        {
            html: '<i class="fas fa-external-link-square-alt"></i> Leaflet.SimpleLocate',
            title: "leaflet-simple-locate",
            href: "https://github.com/mfhsieh/leaflet-simple-locate/",  // href with target
            target: "_blank",
        },
        {
            separator: true,  // separator
        },
        {
            html: '<i class="fab fa-github"></i> About',
            title: "About",
            href: "https://github.com/mfhsieh/leaflet-bootstrap-dropdowns",  // href without target
        }
    ],
}).addTo(map);
```

For more details, refer to this [demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/) (code: [index.html](index.html), [demo.css](examples/demo.css)).


# Options

| Option    | Type   | Default                              | Description                                                                                      |
| --------- | ------ | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| className | String | ""                                   | the custom CSS class name assigned to the control                                                |
| menuItems | List   | []                                   | the menu items in dropdowns (refer to [index.html](index.html))                                  |
| html      | String | refer to [menu.svg](images/menu.svg) | the HTML content of the button                                                                   |
| title     | String | "menu"                               | the "title" attribute of the button                                                              |
| ariaLabel | String | ""                                   | the "aria-label" attribute of the button. If it is an empty string, it will be equal to "title". |

# Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns)

# Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
