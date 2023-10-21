let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;

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
const btn_letras = document.querySelectorAll("#letras button");
const imagen = id("imagen");

//click en iniciar juego
btn.addEventListener("click", iniciar);

console.log(btn);

function iniciar(event) {
  imagen.src = "img/img0.png";
  btn.disabled = true;
  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";

  const cant_palabras = palabras.length;
  const valor_mas_bajo = 0; // índice más bajo del array
  const valor_al_azar = obtener_random(0, cant_palabras);

  palabrita = palabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  //click de adivinar letra
  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }

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
    const palabra = palabrita.toLowerCase();
    const spans = document.querySelectorAll("#palabra_a_adivinar span");
    for (let i = 0; i < letras.length; i++) {
      if (letras[i] === letra) {
        spans[i].textContent = letra;
      }
    }
  }
  // Deshabilita el botón después de hacer clic
  button.disabled = true;

  // Verifica si se ha adivinado la palabra (fuera de la función)
  let acerto = false;
  for (let i = 0; i < palabrita.length; i++) {
    if (palabrita[i] === letra) {
      cant_aciertos++;
      acerto = true;
    }
  }

  if (acerto == false) {
    cant_errores++;
    const source = `img/img${cant_errores}.png`;
    imagen.src = source;
  }

  if (cant_errores == 7) {
    id("resultado").innerHTML =
      "Lo siento, has perdido, la palabra es " + palabrita;
    game_over();
  } else if (cant_aciertos == palabrita.length) {
    id("resultado").innerHTML = "¡Has ganado!";
    game_over();
  }
  console.log(
    "La letra " + letra + " en la palabra " + palabrita + " ¿existe?: " + acerto
  );
}
//fin del juego
function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  btn.disabled = false;
}
