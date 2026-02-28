/*
 * Leaflet.BootstrapDropdowns v1.0.4 - 2026-02-28
 *
 * Copyright 2026 mfhsieh
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
    if (typeof define === "function" && define.amd) {
        // AMD module
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        // CommonJS module
        module.exports = factory(require("leaflet"));

    } else if (typeof window !== "undefined") {
        // Browser globals
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.BootstrapDropdowns = factory(window.L);
    }
})(function (L) {
    "use strict";

    /**
     * @class BootstrapDropdowns
     * @extends L.Control
     * @classdesc A Leaflet control that creates Bootstrap dropdown menus.
     * @param {BootstrapDropdownsOptions} options - Control options.
     */
    const BootstrapDropdowns = L.Control.extend({
        /**
         * @typedef {object} BootstrapDropdownsOptions
         * @property {string} [className=""] - Custom CSS class name for the dropdown.
         * @property {string} [html="(SVG)"] - HTML content of the button (hamburger icon by default).
         * @property {string} [title="menu"] - Title attribute of the button.
         * @property {boolean|string} [autoClose=true] - Control the auto-close behavior (true|inside|outside|false).
         * @property {string} [ariaLabel=""] - ARIA label for the button. Defaults to `title`.
         * @property {Array<Object>} [menuItems=[]] - Array of menu items.
         * @property {boolean} [menuItems[].separator=false] - If true, adds a horizontal divider.
         * @property {boolean} [menuItems[].header=false] - If true, treat this item as a non-clickable header.
         * @property {string} [menuItems[].html=""] - HTML content of the menu item.
         * @property {string} [menuItems[].title=""] - Title attribute of the menu item.
         * @property {string} [menuItems[].ariaLabel=""] - ARIA label for the menu item. Defaults to `title`.
         * @property {boolean} [menuItems[].current=false] - If true, marks the item as active and prevents navigation.
         * @property {boolean} [menuItems[].disabled=false] - If true, renders the item as disabled.
         * @property {string} [menuItems[].href="#"] - Href attribute of the menu item.
         * @property {string} [menuItems[].target=""] - Target attribute of the menu item.
         * @property {string} [menuItems[].rel=""] - Rel attribute of the menu item.
         * @property {Function} [menuItems[].afterClick=undefined] - Callback function to execute when the item is clicked.
         */
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
            autoClose: true,
            menuItems: [],
        },

        /**
         * @function initialize
         * @memberof BootstrapDropdowns.prototype
         * @description Initializes the control with the given options.
         * @param {BootstrapDropdownsOptions} options - Control options.
         */
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        /**
         * @function onAdd
         * @memberof BootstrapDropdowns.prototype
         * @description Adds the control to the map.
         * @param {L.Map} map - The Leaflet map instance.
         * @returns {HTMLElement} The created dropdown element.
         */
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
            this._button.setAttribute("aria-label", this.options.ariaLabel || this.options.title);

            if (this.options.autoClose !== undefined && this.options.autoClose !== null) {
                this._button.setAttribute("data-bs-auto-close", this.options.autoClose);
            }

            const ul = L.DomUtil.create("ul", "dropdown-menu", this._dropdown);

            for (const item of this.options.menuItems) {
                const li = L.DomUtil.create("li", null, ul);

                if (item.separator) {
                    L.DomUtil.create("hr", "dropdown-divider", li);
                    continue;
                }

                const anchor = (item.header) ? L.DomUtil.create("div", "dropdown-header", li) : L.DomUtil.create("a", "dropdown-item", li);
                if (item.html) anchor.innerHTML = item.html;
                if (item.title) anchor.title = item.title;
                if (item.title || item.ariaLabel) anchor.setAttribute("aria-label", item.ariaLabel || item.title);

                if (!item.header) {
                    if (item.current) {
                        L.DomUtil.addClass(anchor, "current");
                        anchor.href = "#";
                        L.DomEvent.on(anchor, "click", L.DomEvent.preventDefault);
                    } else if (item.href && item.href !== "#") {
                        anchor.href = item.href;
                        if (item.target) anchor.target = item.target;
                        if (item.rel) anchor.rel = item.rel;
                    } else if (item.afterClick) {
                        anchor.href = "#";
                        L.DomEvent.on(anchor, "click", L.DomEvent.preventDefault);
                        L.DomEvent.on(anchor, "click", item.afterClick);
                    }
                }
                if (item.disabled) {
                    L.DomUtil.addClass(anchor, "disabled");
                    anchor.href = "#";
                    L.DomEvent.on(anchor, "click", L.DomEvent.preventDefault);
                }
            }

            return this._dropdown;
        },
    });

    /**
     * @function control.bootstrapDropdowns
     * @memberof L.control
     * @description Creates a new BootstrapDropdowns control.
     * @param {BootstrapDropdownsOptions} options - Control options.
     * @returns {BootstrapDropdowns} A new BootstrapDropdowns control.
     */
    L.control.bootstrapDropdowns = function (options) {
        return new BootstrapDropdowns(options);
    };

    return BootstrapDropdowns;
});
