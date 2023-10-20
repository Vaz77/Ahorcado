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
  const parrafo = id("palabra_a_adivinar");
  const cant_palabras = palabras.length;
  const valor_mas_bajo = 0; //indice mas bajo del array
  const valor_al_azar = obtener_random(0, cant_palabras);

  const palabrita = palabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}
