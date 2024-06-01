/* 
 * Leaflet Control BootstrapDropdowns v0.1 - 2024-05-24 
 * 
 * Copyright 2024 mfhsieh
 * mfhsieh@gmail.com 
 * 
 * Licensed under the MIT license. 
 * 
 * Demos: 
 * https://mfhsieh.github.io/leaflet-bootstrap-dropdowns/
 * 
 * Source: 
 * git@github.com:mfhsieh/leaflet-bootstrap-dropdowns.git 
 * 
 */
(function (factory) {

    if (typeof define === 'function' && define.amd) {
        // define an AMD module that relies on 'leaflet'
        define(['leaflet'], factory);

    } else if (typeof exports === 'object') {
        // define a Common JS module that relies on 'leaflet'
        module.exports = factory(require('leaflet'));

    } else if (typeof window !== 'undefined') {
        // attach your plugin to the global 'L' variable
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.BootstrapDropdowns = factory(window.L);
    }
})(function (L) {
    "use strict";

    const control = L.Control.extend({
        options: {
            className: "",
            html: `
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	<rect width="14" height="3" x="1" y="1" rx="0.5" ry="0.5" />
	<rect width="14" height="3" x="1" y="6.5" rx="0.5" ry="0.5" />
	<rect width="14" height="3" x="1" y="12" rx="0.5" ry="0.5" />
</svg>`,
            title: "menu",
            ariaLabel: "",
            menuItems: [],  // separator, html, title, ariaLabel, current, href, target, afterClick
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        onAdd: function (map) {
            this._map = map;

            this._dropdown = L.DomUtil.create("div", "dropdown leaflet-bootstrap-dropdowns");
            if (this.options.className) L.DomUtil.addClass(this._dropdown, this.options.className);
            L.DomEvent.disableClickPropagation(this._dropdown);

            this._button = L.DomUtil.create("button", "btn", this._dropdown);
            this._button.type = "button";
            this._button.innerHTML = this.options.html;
            this._button.title = this.options.title;
            this._button.setAttribute("data-bs-toggle", "dropdown");
            this._button.setAttribute("aria-expanded", "false");
            this._button.setAttribute("aria-label", this.options.ariaLabel ? this.options.ariaLabel : this.options.title);

            const ul = L.DomUtil.create("ul", "dropdown-menu", this._dropdown);

            for (const item of this.options.menuItems) {
                const li = L.DomUtil.create("li", null, ul);

                if (item.separator) {
                    L.DomUtil.create("hr", "dropdown-divider", li);
                    continue;
                }

                const anchor = L.DomUtil.create("a", "dropdown-item", li);
                if (item.html) anchor.innerHTML = item.html;
                if (item.title) anchor.title = item.title;
                if (item.title || item.ariaLabel) anchor.setAttribute("aria-label", item.ariaLabel ? item.ariaLabel : item.title);

                if (item.current) {
                    L.DomUtil.addClass(anchor, "current");
                    anchor.href = "#";
                    L.DomEvent.on(anchor, "click", L.DomEvent.preventDefault);
                } else {
                    if (item.href && item.href !== "#") {
                        anchor.href = item.href;
                        if (item.target) anchor.target = item.target;
                    } else if (item.afterClick) {
                        L.DomEvent.on(anchor, "click", item.afterClick);
                    }
                }
            }

            return this._dropdown;
        },
    });

    return control;
});