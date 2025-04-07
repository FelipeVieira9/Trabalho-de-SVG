const svg = document.getElementById('main_svg');
const svg_padding = 30;

let maxValue = 0;
let minValue = 0;

let IPCA_pos_values_x = [
    
]

let IPCA_pos_values_y = [
    
]

let IGPM_pos_values_x = [
    
]

let IGPM_pos_values_y = [
    
]

const IPCA_2024_values = [
    ['Jan', 4.5066],
    ['Fev', 4.4963],
    ['Mar', 3.9256],
    ['Abr', 3.6880],
    ['Mai', 3.9260],
    ['Jun', 4.2276],
    ['Jul', 4.4982],
    ['Agos', 4.2376],
    ['Set', 4.4247],
    ['Out', 4.7581],
    ['Nov', 4.8730],
    ['Dez', 4.8313]
]

const IGPM_2024_values = [
    ['Janeiro', -3.3136],
    ['Fevereiro', -3.7586],
    ['Março', -4.2588],
    ['Abril', -3.0409],
    ['Maio', -0.3443],
    ['Junho', 2.4400],
    ['Julho', 3.8124],
    ['Agosto', 4.2594],
    ['Setembro', 4.5191],
    ['Outubro', 4.7077],
    ['Novembro', 5.9433],
    ['Dezembro', 6.8650]
]

for (let i = 0; i < IPCA_2024_values.length; i++) {
    if (IPCA_2024_values[i][1] > maxValue) {
        maxValue = IPCA_2024_values[i][1];
    }
}

for (let i = 0; i < IPCA_2024_values.length; i++) {
    if (IPCA_2024_values[i][1] < minValue) {
        minValue = IPCA_2024_values[i][1];
    }
}

for (let i = 0; i < IGPM_2024_values.length; i++) {
    if (IGPM_2024_values[i][1] > maxValue) {
        maxValue = IGPM_2024_values[i][1];
    }
}

for (let i = 0; i < IGPM_2024_values.length; i++) {
    if (IGPM_2024_values[i][1] < minValue) {
        minValue = IGPM_2024_values[i][1];
    }
}

console.log(maxValue, minValue)


export const resizeSvg_window = () => {
    const svg_width = window.innerWidth * 0.6;
    const svg_Height = window.innerHeight * 0.6;
    svg.setAttribute('width', String(svg_width));
    svg.setAttribute('height', String(svg_Height));
}

export const adjustElements_svg = () => {
    const svg_width = svg.getAttribute('width');
    const svg_Height = svg.getAttribute('height');

    const x_axis = function () {
        let elementSvg_HTML = '';
        const main_x_axis = svg_Height;
        let secondary_x_axis = '';
        const secondary_x_axis_step = Math.round((svg_Height - svg_padding)/(6))
        const x_legend = '';
        const x_legend_step_positive = maxValue/(3)
        const x_legend_step_negative = Math.abs(minValue)/(3)
        console.log(x_legend_step_negative)
        
        for (let x = 0; x < 6; x++) {
            if (x === 3) {
                secondary_x_axis += `<line x1="${svg_padding}" y1="${secondary_x_axis_step * (x + 0.5)}" x2="${svg_width - svg_padding}" y2="${secondary_x_axis_step * (x + 0.5)}" style="stroke:red;stroke-width:0.8" />`
                secondary_x_axis += `<text x="${15}" y="${secondary_x_axis_step * (x + 0.5)}">${'0'}</text>`
            }

            if (x < 3) {
                secondary_x_axis += `<text x="${15}" y="${secondary_x_axis_step * (x + 1)}">${-Math.floor(x_legend_step_positive*(x-2))}</text>`
                
            } else {
                secondary_x_axis += `<text x="${10}" y="${secondary_x_axis_step * (x + 1)}">${-Math.floor(x_legend_step_negative*(x-2))}</text>`
            }

            secondary_x_axis += `<line x1="${svg_padding}" y1="${secondary_x_axis_step * (x + 1)}" x2="${svg_width - svg_padding}" y2="${secondary_x_axis_step * (x + 1)}" style="stroke:black;stroke-width:0.5" />`
        }

        for (let x = 0; x < 12; x++) {
            if (IPCA_2024_values[x][1] >= 0) {
                IPCA_pos_values_x.push(IPCA_2024_values[x][1] / maxValue);
            } else {
                IPCA_pos_values_x.push(-(IPCA_2024_values[x][1] / minValue));
            }

            if (IGPM_2024_values[x][1] >= 0) {
                IGPM_pos_values_x.push(IGPM_2024_values[x][1] / maxValue);
            } else {
                IGPM_pos_values_x.push(-(IGPM_2024_values[x][1] / minValue));
            }
            // console.log(IGPM_pos_values_x)
            
        }
        
        elementSvg_HTML += `<line x1="${svg_padding}" y1="${main_x_axis - svg_padding}" x2="${svg_width - svg_padding}" y2="${main_x_axis - svg_padding}" style="stroke:black;stroke-width:2" />`;
        elementSvg_HTML += secondary_x_axis;

        return elementSvg_HTML;
    }()

    const y_axis = function () {
        let elementSvg_HTML = '';
        let y_legend = '';
        const y_legend_step = Math.round((svg_width + svg_padding)/(12))

        for (let x = 0; x < 12; x++) {
            y_legend += `<text x="${y_legend_step * (x + 1) - svg_padding}" y="${svg_Height - svg_padding /2}">${IPCA_2024_values[x][0]}</text>`
            IPCA_pos_values_y.push(y_legend_step * (x + 1) - svg_padding)
        }
        IGPM_pos_values_y = IPCA_pos_values_y;

        elementSvg_HTML += `<line x1="${svg_padding}" y1="${svg_padding}" x2="${svg_padding}" y2="${svg_Height - svg_padding}" style="stroke:black;stroke-width:2" />`
        elementSvg_HTML += y_legend;
        return elementSvg_HTML;
    }()

    const IPCA_function_line = function () {
        let elementSvg_HTML = '';
        
        for (let x = 0; x < 12; x++) {
            if (IPCA_pos_values_x[x] < 0) {
                IPCA_pos_values_x[x] = (IPCA_pos_values_x[x][1] + 1)
            }
            
            if (IGPM_pos_values_x[x] < 0) {
                IGPM_pos_values_x[x] = (-IGPM_pos_values_x[x]/(maxValue)) - 0.1
            }
            // console.log(IGPM_pos_values_x[x])
            // console.log(IGPM_pos_values_x)

            elementSvg_HTML += `<circle cx="${IPCA_pos_values_y[x]}" cy="${-((svg_Height - svg_padding)*(IPCA_pos_values_x[x] - 1)+30)}" r="5" style="fill: blue"/>`
            
            if (IPCA_pos_values_x[x + 1]) {
                elementSvg_HTML += `<line x1="${IPCA_pos_values_y[x]}" y1="${-((svg_Height - svg_padding)*(IPCA_pos_values_x[x] - 1)+30)}" x2="${IPCA_pos_values_y[x+1]}" y2="${-((svg_Height - svg_padding)*(IPCA_pos_values_x[x+1] - 1)+30)}" style="stroke:black;stroke-width:0.5" />`
            }

            elementSvg_HTML += `<circle cx="${IGPM_pos_values_y[x]}" cy="${-((svg_Height - svg_padding)*(IGPM_pos_values_x[x] - 1)+30)}" r="5" style="fill: green"/>`

            if (IGPM_pos_values_x[x + 1]) {
                elementSvg_HTML += `<line x1="${IGPM_pos_values_y[x]}" y1="${-((svg_Height - svg_padding)*(IGPM_pos_values_x[x] - 1)+30)}" x2="${IGPM_pos_values_y[x+1]}" y2="${-((svg_Height - svg_padding)*(IGPM_pos_values_x[x+1] - 1)+30)}" style="stroke:green;stroke-width:0.5" />`
            }
            // console.log(IGPM_pos_values_y[x], IGPM_pos_values_y[x + 1])
        }

        // elementSvg_HTML += <circle cx="50" cy="50" r="50" />';
        return elementSvg_HTML;
    }()

    IPCA_pos_values_y = [];
    IPCA_pos_values_x = [];
    IGPM_pos_values_x = [];
    IGPM_pos_values_y = [];
    svg.innerHTML += x_axis;
    svg.innerHTML += y_axis;
    svg.innerHTML += IPCA_function_line;

    svg.innerHTML += `<text x="${svg_width / 3.8}" y="30">IPCA(AZUL) e IGPM(VERDE) no Brasil em 2024</text>`
}

export const startGraph = () => {
    resizeSvg_window();
    adjustElements_svg();
}