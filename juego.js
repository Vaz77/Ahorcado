let palabrita;
const palabras = [
  "manzanas",
  "camiseta",
  "caramelos",
  "ñoquis",
  "streamer",
  "twicht",
  "murcielago",
];
const btn = id("jugar");
btn.addEventListener("click", iniciar);

console.log(btn);

function iniciar(event) {
  btn.disabled = true;
  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";

  const cant_palabras = palabras.length;
  const valor_mas_bajo = 0; //indice mas bajo del array
  const valor_al_azar = obtener_random(0, cant_palabras);

  palabrita = palabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }

  const btn_letras = document.querySelectorAll("#letras button");
  btn_letras.forEach(function (button) {
    button.addEventListener("click", function () {
      click_letras(button);
    });
  });
}

function click_letras(button) {
  const letra = button.textContent;
  if (palabrita.includes(letra)) {
    // La letra está en la palabra, muestra la letra en la posición correcta
    const letras = palabrita.split("");
    const spans = document.querySelectorAll("#palabra_a_adivinar span");
    for (let i = 0; i < letras.length; i++) {
      if (letras[i] === letra) {
        spans[i].textContent = letra;
      }
    }
  }
  // Deshabilita el botón después de hacer clic
  button.disabled = true;
}
