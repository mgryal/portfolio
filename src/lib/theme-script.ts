export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script injected in <head>. Runs before first paint so there is no
 * flash: stored choice wins, then the system preference, then dark.
 */
export const THEME_SCRIPT = `(function(){var t="dark",s=null;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(s==="light"||s==="dark"){t=s}else{try{if(window.matchMedia("(prefers-color-scheme: light)").matches){t="light"}}catch(e){}}document.documentElement.setAttribute("data-theme",t)})();`;
