/*
 * Leaflet.BootstrapDropdowns v1.0.3 - 2025-03-23
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
     * @param {Object} options - Control options.
     */
    const BootstrapDropdowns = L.Control.extend({
        /**
         * @property {Object} options - Default options for the control.
         * @property {string} options.className - Custom CSS class name for the dropdown.
         * @property {string} options.html - HTML content of the button.
         * @property {string} options.title - Title attribute of the button.
         * @property {string} options.autoClose - The autoclose behaviour of the button (true|inside|outside|false)
         * @property {string} options.ariaLabel - ARIA label for the button.
         * @property {Array<Object>} options.menuItems - Array of menu items.
         * @property {boolean} options.menuItems[].separator - If true, adds a separator.
         * @property {string} options.menuItems[].html - HTML content of the menu item.
         * @property {string} options.menuItems[].title - Title attribute of the menu item.
         * @property {string} options.menuItems[].ariaLabel - ARIA label for the menu item.
         * @property {boolean} options.menuItems[].current - If true, marks the item as current.
         * @property {string} options.menuItems[].href - Href attribute of the menu item.
         * @property {string} options.menuItems[].target - Target attribute of the menu item.
         * @property {string} options.menuItems[].rel - Rel attribute of the menu item.
         * @property {Function} options.menuItems[].afterClick - Callback function for click event.
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
            menuItems: [],  // separator, html, title, ariaLabel, current, href, target, rel, afterClick
        },

        /**
         * @function initialize
         * @memberof BootstrapDropdowns.prototype
         * @description Initializes the control with the given options.
         * @param {Object} options - Control options.
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
            this._button.setAttribute("aria-label", this.options.ariaLabel ? this.options.ariaLabel : this.options.title);

            if ("autoClose" in this.options) {
            	this._button.setAttribute("data-bs-auto-close", this.options.autoClose);
            }

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
                        if (item.rel) anchor.rel = item.rel;
                    } else if (item.afterClick) {
                        L.DomEvent.on(anchor, "click", item.afterClick);
                    }
                }
            }

            return this._dropdown;
        },
    });

    /**
     * @function control.bootstrapDropdowns
     * @memberof L.control
     * @description Creates a new BootstrapDropdowns control.
     * @param {Object} options - Control options.
     * @returns {BootstrapDropdowns} A new BootstrapDropdowns control.
     */
    L.control.bootstrapDropdowns = function (options) {
        return new BootstrapDropdowns(options);
    };

    return BootstrapDropdowns;
});
