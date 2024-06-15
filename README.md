Leaflet.BootstrapDropdowns
=

A Leaflet plugin to show [bootstrap dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/). Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/) 
* Current Version: v1.0.0

# Usage

Simply include the [JS](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/src/leaflet-bootstrap-dropdowns.js) and [CSS](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/examples/demo.css) in the head.

```
<head>
    ...
    <script src="leaflet-bootstrap-dropdowns.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And add the control to the map.

```
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

For more examples, refer to this [demo](https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/) (code: [index.html](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/index.html), [demo.css](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/examples/demo.css)).


# Options

| Option    | Type   | Default                                                                                      | Description                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| className | String | ""                                                                                           | A custom CSS class name to assign to the control.                                                                               |
| menuItems | List   | []                                                                                           | The menu items in dropdowns. (refer: [index.html](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/index.html)) |
| html      | String | [menu.svg](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns/blob/main/images/menu.svg) | The HTML content of the button.                                                                                                 |
| title     | String | "menu"                                                                                       | The title attribute of the button.                                                                                              |
| ariaLabel | String | ""                                                                                           | The aria-label attribute of the button. If its value is an empty string, it will be equal to "title".                           |

# Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-bootstrap-dropdowns)

# Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
