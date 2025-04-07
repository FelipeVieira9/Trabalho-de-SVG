import { resizeSvg_window, startGraph, adjustElements_svg } from "./functions.js";
const svg = document.getElementById('main_svg');

startGraph();

window.addEventListener('resize', () => {
    svg.innerHTML = '';

    resizeSvg_window();
    adjustElements_svg();
    const maxWidth = svg.getAttribute('width');

    console.log(maxWidth)
})