// Función para encriptar el texto ingresado en el textarea
function encriptar(convertir) {
    // Remueve cualquier estilo existente en el elemento con id "warning"
    document.querySelector("#warning").removeAttribute("style");

    // Selecciona el elemento textarea y obtiene su valor
    var textarea = document.querySelector("#texto");
    const texto = textarea.value;

    // Selecciona los elementos que contienen las áreas de visualización por defecto y resultados
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    // Verifica si el texto no está vacío
    if (texto != "") {
        var out = "";
        
        // Itera a través de cada carácter del texto
        for (var i = 0; i < texto.length; i++) {
            // Verifica si el carácter es válido (letra minúscula o espacio)
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')) {
                // Si el carácter no es válido, muestra una advertencia y termina la función
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            } 
            // Verifica si el texto es un solo espacio o está vacío después de quitar los espacios
            else if ((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == "") {
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }

            // Encripta el texto según las reglas definidas en el objeto 'convertir'
            if (texto[i] == 'a') {
                out += convertir["a"];
            } else if (texto[i] == 'e') {
                out += convertir["e"];
            } else if (texto[i] == 'i') {
                out += convertir["i"];
            } else if (texto[i] == 'o') {
                out += convertir["o"];
            } else if (texto[i] == 'u') {
                out += convertir["u"];
            } else {
                out += texto[i];
            }
        }

        // Muestra el área de resultados y oculta el área por defecto
        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");

        // Muestra el texto encriptado en el elemento 'texto_out'
        texto_out.innerHTML = out;
    }

    return;
}

// Función para desencriptar el texto ingresado en el textarea
function desencriptar(convertir) {
    // Remueve cualquier estilo existente en el elemento con id "warning"
    document.querySelector("#warning").removeAttribute("style");

    // Selecciona el elemento textarea y obtiene su valor
    var textarea = document.querySelector("#texto");
    var texto = textarea.value;

    // Selecciona los elementos que contienen las áreas de visualización por defecto y resultados
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    // Verifica si el texto no está vacío
    if (texto != "") {
        // Itera a través de cada carácter del texto
        for (var i = 0; i < texto.length; i++) {
            // Verifica si el carácter es válido (letra minúscula o espacio)
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')) {
                // Si el carácter no es válido, muestra una advertencia y termina la función
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            } 
            // Verifica si el texto es un solo espacio o está vacío después de quitar los espacios
            else if ((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == "") {
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
        }

        // Muestra el área de resultados y oculta el área por defecto
        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");

        // Desencripta el texto reemplazando las secuencias encriptadas por sus respectivas vocales
        texto = texto.replace(new RegExp(convertir["a"], "g"), "a");
        texto = texto.replace(new RegExp(convertir["e"], "g"), "e");
        texto = texto.replace(new RegExp(convertir["i"], "g"), "i");
        texto = texto.replace(new RegExp(convertir["o"], "g"), "o");
        texto = texto.replace(new RegExp(convertir["u"], "g"), "u");

        // Muestra el texto desencriptado en el elemento 'texto_out'
        texto_out.innerHTML = texto;
    }
    return;
}

// Función para copiar el contenido del texto desencriptado al portapapeles
function clipboard() {
    const texto_out = document.querySelector("#texto_out");
    navigator.clipboard.writeText(texto_out.value);
}

// Selecciona los botones de encriptar, desencriptar y copiar
const enc = document.querySelector('#enc');
const des = document.querySelector('#des');
const copy = document.querySelector('#copiar');

// Define las reglas de encriptación
var convertir = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

// Asigna los eventos de clic a los botones, llamando a las funciones correspondientes
enc.addEventListener('click', function() { encriptar(convertir); });
des.addEventListener('click', function() { desencriptar(convertir); });
copy.addEventListener('click', function() { clipboard(); });
