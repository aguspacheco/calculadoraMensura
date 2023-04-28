const modulo_200 = 200;
const modulo_500 = 500;
const modulo_550 = 550;
const modulo_625 = 625;
const modulo_750 = 750;

const multiplicador = 2.5;

const porc_preferencial = 500;

function CalculoCondicional(PARCELAS) {
  if (PARCELAS <= 5) return PARCELAS * modulo_750 * multiplicador;
  else if (PARCELAS >= 6 && PARCELAS <= 20)
    return PARCELAS * modulo_625 * multiplicador;
  else if (PARCELAS >= 21 && PARCELAS <= 40)
    return PARCELAS * modulo_550 * multiplicador;
  else return PARCELAS * modulo_500 * multiplicador;
}

function borrarContenido() {
  const inputs = document.querySelectorAll(".formulario form input");
  const textareas = document.querySelectorAll(".formulario form textarea");
  inputs.forEach((input) => (input.value = ""));
  textareas.forEach((textarea) => (textarea.value = ""));
}

const btnVolver = document.getElementById("btnVolver");

btnVolver.addEventListener("click", () => {
  const formulario = document.querySelector(".formulario");
  const detalle = document.querySelector(".detalle");
  detalle.innerHTML = "";
  detalle.style.display = "block";
  formulario.style.display = "block";
  document.getElementById("btnVolver").style.display = "none";
  const preferencial = document.getElementById("preferencial");
  preferencial.checked = false;
  document.getElementById("tabla").style.display = "none";
  borrarContenido();
  resultado.innerHTML = "";
});

const btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener("click", () => {
  const preferencial = document.getElementById("preferencial");
  preferencial.checked = false;
  borrarContenido();
  resultado.innerHTML = "";
});

btnDetalle.addEventListener("click", () => {
  const formulario = document.querySelector(".formulario");
  const detalle = document.querySelector(".detalle");
  const parcelaOrigen = Number(document.getElementById("parcela_origen").value);
  const parcelaResultante = Number(
    document.getElementById("parcela_resultante").value
  );
  const ddjj = Number(document.getElementById("ddjj").value);
  const preferencial = document.getElementById("preferencial").checked;

  if (parcelaOrigen && parcelaResultante && ddjj) {
    formulario.style.display = "none";
    if (!detalle.innerHTML) {
      const tabla = document.getElementById("tabla");
      for (let i = tabla.rows.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
      }
      const nuevaFila = tabla.insertRow();
      const celdaParcelaOrigen = nuevaFila.insertCell(0);
      celdaParcelaOrigen.innerHTML = parcelaOrigen;

      const celdaParcelaResultante = nuevaFila.insertCell(1);
      celdaParcelaResultante.innerHTML = parcelaResultante;

      const celdaDDJJ = nuevaFila.insertCell(2);
      celdaDDJJ.innerHTML = ddjj;

      const celdaTotal = nuevaFila.insertCell(3);
      celdaTotal.innerHTML = calculoTotal(
        parcelaOrigen,
        parcelaResultante,
        ddjj,
        preferencial
      );

      document.getElementById("btnVolver").style.display = "block";
      document.getElementById("tabla").style.display = "block";
      resultado.innerHTML = "";
    }
  } else {
    alert("⚠ Por favor, complete todos los campos");
  }
});

const form = document.querySelector("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ORIGEN = Number(document.getElementById("parcela_origen").value);
  const RESULTANTE = Number(
    document.getElementById("parcela_resultante").value
  );
  const DDJJ = Number(document.getElementById("ddjj").value);
  const PREFERENCIAL = document.getElementById("preferencial").checked;

  const total = calculoTotal(ORIGEN, RESULTANTE, DDJJ, PREFERENCIAL);
  resultado.innerHTML = `El resultado es: ${total}`;
});

function calculoTotal(ORIGEN, RESULTANTE, DDJJ, PREFERENCIAL) {
  const PARCELAS = ORIGEN + RESULTANTE;
  let total = CalculoCondicional(PARCELAS) + DDJJ * modulo_200 * multiplicador;

  console.log(total);
  console.log(PREFERENCIAL);

  if (PREFERENCIAL) {
    total += (total * porc_preferencial) / 100;
  }

  const formatoMoneda = total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return formatoMoneda;
}
