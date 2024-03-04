//Inicializamos el evento para detectar la carga de la pagina
document.addEventListener('DOMContentLoaded', function() {
    //Dentro de este se buscara el color por defecto del sistema y se cambiara
  
    const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark': 'light';
  
    document.documentElement.setAttribute('data-theme', systemColorScheme);
    const switcherTheme = document.getElementById('modoToggle');
    const root = document.documentElement;
    if (root.getAttribute('data-theme') === 'dark') {
      switcherTheme.checked = true;
    } 
  
    function toggleTheme(){
      const setTheme = switcherTheme.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', setTheme);
      // localStorage.setItem('theme', setTheme);
    }
  
    switcherTheme.addEventListener('click', toggleTheme);
  });
  
  //Declaración de las constantes
  const TEXT_AREA_RAW = document.getElementById("text-area");
  const TEXT_AREA_DECRYPTED = document.getElementById("answer-codified");
  const BUTTON_ENCRYPT = document.getElementById("button-encrypt");
  const BUTTON_DECRYPT = document.getElementById("button-decrypt");
  const BUTTON_COPY = document.getElementById("button-copy");
  const FORM = document.getElementById("section-text__form");
  const INFO_TEXT_ANSWER = document.getElementById("section-answer-info");
  const BUTTON_RESET = document.getElementById("button-reset");
  //Funciones para validar
  function soloLetras(e) {
    let tecla = (e.key) ? e.key.charCodeAt(0) : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8 || tecla == 69 || tecla == 66 || tecla == 13) {
      return true;
    }
    // Patron de entrada, en este caso solo acepta numeros y letras
    const patron = new RegExp("^[a-zñ ]+$");
    let tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
  
  /*Añadimos las validaciones para evitar números y permitir solo letras
    adicionalmente reiniciamos la UI para evitar incoherencias
  */
  
  
  TEXT_AREA_RAW.addEventListener("keypress", function (e) {
    if (!soloLetras(e)) e.preventDefault();
  
    INFO_TEXT_ANSWER.classList.remove("hide");
    TEXT_AREA_DECRYPTED.classList.add("hide");
    BUTTON_COPY.classList.add("hide");
    BUTTON_RESET.classList.remove("hide");
  });
  
  FORM.addEventListener("submit", e => {
    e.preventDefault();
    //Obtenemos los datos del formulario y los convertimos en un objeto
    const data = Object.fromEntries(new FormData(e.target));

    //Reemplazamos todas las coincidencias en el texto
    const textEncrypted = data.textToEncrypt
      .replaceAll('e', 'enter')
      .replaceAll('i', 'imes')
      .replaceAll('a', 'ai')
      .replaceAll('o', 'ober')
      .replaceAll('u', 'ufat')
      .toLowerCase();

    console.log(textEncrypted);

    //Modificamos la UI para que coincida con el texto
    INFO_TEXT_ANSWER.classList.add("hide");
    TEXT_AREA_DECRYPTED.classList.remove("hide");
    TEXT_AREA_DECRYPTED.value = textEncrypted;
    BUTTON_DECRYPT.disabled = false;
    BUTTON_COPY.classList.remove("hide");
  });
  
  //Añadimos la funcionalidad para desencriptar
  BUTTON_DECRYPT.addEventListener("click", () => {
    //Reemplazamos todas las coincidencias en el texto
    const textDecrypted = TEXT_AREA_RAW.value.toLowerCase()
      .replaceAll('ai', 'a')  
      .replaceAll('enter', 'e')
      .replaceAll('imes', 'i')
      .replaceAll('ober', 'o')
      .replaceAll('ufat', 'u');
  
    //Modificamos la UI para que coinicida con el texto
    INFO_TEXT_ANSWER.classList.add("hide");
    TEXT_AREA_DECRYPTED.classList.remove("hide");
    TEXT_AREA_DECRYPTED.value = textDecrypted;
    BUTTON_DECRYPT.disabled = false;
    BUTTON_COPY.classList.remove("hide");
  })
  
  
  //Funcionalidad para copia el texto
  BUTTON_COPY.addEventListener("click", () => {
    navigator.clipboard.writeText(TEXT_AREA_DECRYPTED.value)
      .then(() => {
        alert("Texto copiado");
      })
      .catch(()=>{
        alert("Error al copiar el texto");
      });
  });