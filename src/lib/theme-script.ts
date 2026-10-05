export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script injected in <head>. Runs before first paint so there is no
 * flash: stored choice wins, then the system preference, then dark.
 */
export const THEME_SCRIPT = `(function(){var t="dark";try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");if(s==="light"||s==="dark"){t=s}else if(window.matchMedia("(prefers-color-scheme: light)").matches){t="light"}}catch(e){}document.documentElement.setAttribute("data-theme",t)})();`;
