let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;
let juegoActivo = false;

const palabras = [
  "guitarra",
  "cineasta",
  "elefante",
  "juguetes",
  "playa",
  "montaña",
  "viaje",
  "espejo",
  "ciencia",
  "camino",
  "aventura",
  "dinero",
  "naturaleza",
  "solucion",
  "chocolate",
  "quimica",
  "frutas",
  "pintura",
  "felicidad",
  "explorar",
  "telescopio",
  "universidad",
  "amistad",
  "musical",
  "dibujar",
  "imaginacion",
  "volar",
  "secretos",
  "celebrar",
  "piano",
  "montaña",
  "sorpresa",
  "universo",
  "fruta",
  "familia",
  "feliz",
  "concierto",
  "pintor",
  "viajar",
  "isla",
  "leer",
  "poesía",
  "oceano",
  "fotografia",
  "tecnologia",
];
const pistas = [
  "Instrumento de cuerdas, ampliamente utilizado en música clásica.",
  "Creador de ilusiones en la gran pantalla.",
  "El mamífero terrestre más grande del mundo.",
  "Objetos que fomentan la creatividad y el juego imaginativo.",
  "Un lugar para tomar el sol y nadar en la costa.",
  "Un gigante de roca que desafía a los escaladores.",
  "Un recorrido emocionante a lugares lejanos y desconocidos.",
  "Un objeto que refleja tu imagen con precisión.",
  "Un campo de estudio que busca comprender el mundo que nos rodea.",
  "Un camino hacia un destino desconocido.",
  "Una travesía llena de riesgos y emoción.",
  "Un medio de intercambio utilizado en transacciones comerciales.",
  "La vida en la Tierra, incluyendo plantas y animales.",
  "Una solución ingeniosa para un problema complejo.",
  "Un postre tentador con cacao y azúcar.",
  "El estudio de las sustancias y su composición.",
  "Frutos frescos y sabrosos de árboles y arbustos.",
  "El arte de plasmar la realidad en lienzos o papel.",
  "Un estado de satisfacción y alegría profunda.",
  "Descubrimiento y aprendizaje de cosas nuevas y desconocidas.",
  "Un dispositivo óptico para observar objetos lejanos.",
  "Una institución de educación superior y conocimiento.",
  "Una relación especial basada en confianza y cariño.",
  "Relativo a la producción y apreciación de música.",
  "La creación de imágenes y representaciones visuales.",
  "La capacidad de idear nuevas realidades y conceptos.",
  "Elevarse en el aire y volar como las aves.",
  "Datos, hechos o información que se mantienen ocultos.",
  "Celebración y conmemoración de momentos importantes.",
  "Un instrumento musical elegante y clásico.",
  "Una cumbre imponente en la naturaleza.",
  "Una sorpresa inesperada que cambia la perspectiva.",
  "El cosmos y todo lo que lo compone.",
  "Una deliciosa y jugosa fuente de vitaminas.",
  "El lazo que une a parientes cercanos.",
  "Un estado de bienestar y contento.",
  "Una actuación musical en vivo.",
  "Un artista que crea obras visuales.",
  "Explorar nuevos lugares y culturas.",
  "Una tierra rodeada por aguas en calma.",
  "Descifrar y entender textos escritos.",
  "Una expresión literaria llena de belleza y ritmo.",
  "Una vasta extensión de agua salada.",
  "La captura de momentos y memorias visuales.",
  "Los avances científicos y tecnológicos en conjunto.",
];
const btn = id("jugar");
const btn_letras = document.querySelectorAll("#letras button");
const imagen = id("imagen");
btn.addEventListener("click", function () {
  if (!juegoActivo) {
    reproducirAudioTension();
    iniciar();
  }
});
console.log(btn);
function iniciar() {
  juegoActivo = true;
  imagen.src = "img/img0.png";
  btn.disabled = true;
  id("resultado").innerHTML = "";
  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";
  const cant_palabras = palabras.length;
  const valor_al_azar = obtener_random(0, cant_palabras);
  palabrita = palabras[valor_al_azar];
  const pista = pistas[valor_al_azar];
  console.log(palabrita);
  id("pista").textContent = "Pista: " + pista;
  const cant_letras = palabrita.length;
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }
  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}
btn_letras.forEach(function (button) {
  button.addEventListener("click", function () {
    click_letras(button);
    button.classList.add("seleccionada");
  });
});
function reproducirAudioTension() {
  const audioTension = document.getElementById("audioTension");
  audioTension.play();
}
function reproducirAudioVictoria() {
  const audioVictoria = document.getElementById("audioVictoria");
  audioVictoria.play();
}
function reproducirAudioDerrota() {
  const audioVictoria = document.getElementById("audioDerrota");
  audioDerrota.play();
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
  button.disabled = true;
  let acerto = false;
  for (let i = 0; i < palabrita.length; i++) {
    if (palabrita[i] === letra) {
      cant_aciertos++;
      acerto = true;
    }
  }
  if (!acerto) {
    cant_errores++;
    if (cant_errores <= 7) {
      const source = `img/img${cant_errores}.png`;
      // Verificar si se han agotado los intentos
      if (cant_errores <= 7) {
        imagen.src = source;
      }
    }
  }
  if (cant_errores == 7) {
    id("resultado").innerHTML =
      "Lo siento, has perdido, la palabra es " + palabrita;
    reproducirAudioDerrota();
    game_over();
  } else if (cant_aciertos == palabrita.length) {
    id("resultado").innerHTML = "¡Has ganado!";
    reproducirAudioVictoria();
    game_over();
  }
  console.log(
    "La letra " + letra + " en la palabra " + palabrita + " ¿existe?: " + acerto
  );
}
// Fin del juego
function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  btn.disabled = false;
  // Agrega un nuevo evento al boton "Obtener palabra" para reiniciar el juego
  btn.addEventListener("click", reiniciarJuego);
}
// Función para reiniciar el juego
function reiniciarJuego() {
  // Elimina el evento "reiniciarJuego" del botón para evitar duplicados
  btn.removeEventListener("click", reiniciarJuego);
  // Elimina la clase "seleccionada" de todos los botones de letras
  btn_letras.forEach(function (button) {
    button.classList.remove("seleccionada");
  });
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }
  btn.disabled = true;
  id("resultado").innerHTML = "";
  cant_errores = 0;
  cant_aciertos = 0;
  // Elimina los elementos de adivinanza de letras
  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";
  // Llama a la función de inicio para comenzar un nuevo juego
  iniciar();
}
