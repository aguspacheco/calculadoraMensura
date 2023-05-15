// DefiniciónConstantes
const modulo_200 = 200;
const modulo_500 = 500;
const modulo_550 = 550;
const modulo_625 = 625;
const modulo_750 = 750;

const multiplicador = 2.5;
const modulo_funcional = 500;

const porc_preferencial = 500;

function CalculoCondicional(PARCELAS) {
  if (PARCELAS <= 5) {
    return PARCELAS * modulo_750 * multiplicador;
  } else if (PARCELAS >= 6 && PARCELAS <= 20) {
    return PARCELAS * modulo_625 * multiplicador;
  } else if (PARCELAS >= 21 && PARCELAS <= 50) {
    return PARCELAS * modulo_550 * multiplicador;
  } else return PARCELAS * modulo_500 * multiplicador;
}

function borrarContenido() {
  const inputs = document.querySelectorAll(".formulario form input");
  const textareas = document.querySelectorAll(".formulario form textarea");
  inputs.forEach((input) => (input.value = ""));
  textareas.forEach((textarea) => (textarea.value = ""));
  resultado.innerHTML = "";
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
  formato.style.display = "block";
});

const btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener("click", () => {
  const preferencial = document.getElementById("preferencial");
  preferencial.checked = false;
  const urbana = document.getElementById("urbana");
  urbana.checked = false;
  const rural = document.getElementById("rural");
  rural.checked = false;
  const subrural = document.getElementById("subrural");
  subrural.checked = false;
  borrarContenido();
});

const btnDetalle = document.getElementById("btnDetalle");

btnDetalle.addEventListener("click", () => {
  const formulario = document.querySelector(".formulario");
  const detalle = document.querySelector(".detalle");
  let parcelaOrigen = Number(document.getElementById("parcela_origen").value);
  let parcelaResultante = Number(
    document.getElementById("parcela_resultante").value
  );
  let unidadFuncional = Number(
    document.getElementById("unidad_funcional").value
  );
  const preferencial = document.getElementById("preferencial").checked;

  if (parcelaOrigen > parcelaResultante) {
    alert(
      "⚠ La cantidad de parcelas origen debe ser mayor o igual que la cantidad de parcelas resultante"
    );
  }
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

    const celdaUnidadFuncional = nuevaFila.insertCell(2);
    celdaUnidadFuncional.innerHTML = unidadFuncional;

    const celdaPreferencial = nuevaFila.insertCell(3);
    celdaPreferencial.innerHTML = preferencial ? "SI✔" : "NO❌";

    const celdaTotal = nuevaFila.insertCell(4);
    celdaTotal.innerHTML = calculoTotal(
      parcelaOrigen,
      parcelaResultante,
      unidadFuncional,
      preferencial
    );

    document.getElementById("btnVolver").style.display = "block";
    document.getElementById("tabla").style.display = "block";
    resultado.innerHTML = "";
  }
});

const form = document.querySelector("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ORIGEN = Number(document.getElementById("parcela_origen").value || 0);
  const RESULTANTE = Number(
    document.getElementById("parcela_resultante").value || 0
  );
  const FUNCIONAL = parseInt(
    document.getElementById("unidad_funcional").value || 0
  );
  const PREFERENCIAL = document.getElementById("preferencial").checked;

  calcularYMostrarResultado(ORIGEN, RESULTANTE, FUNCIONAL, PREFERENCIAL);
});

function calcularYMostrarResultado(
  ORIGEN,
  RESULTANTE,
  FUNCIONAL,
  PREFERENCIAL
) {
  if (RESULTANTE >= ORIGEN) {
    const total = calculoTotal(ORIGEN, RESULTANTE, FUNCIONAL, PREFERENCIAL);
    resultado.innerHTML = `El total a pagar es: ${total}`;
  } else {
    alert(
      "⚠ la cantidad de parcelas resultante tiene que ser mayor o igual que la cantidad de parcelas origen"
    );
  }
}

function calculoTotal(ORIGEN, RESULTANTE, FUNCIONAL, PREFERENCIAL) {
  const PARCELAS = ORIGEN + RESULTANTE;
  let total =
    CalculoCondicional(PARCELAS) + FUNCIONAL * modulo_funcional * multiplicador;

  if (PREFERENCIAL) {
    total += (total * porc_preferencial) / 100;
  }

  const formatoMoneda = total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  return formatoMoneda;
}

function seleccionarCheckbox(id) {
  if (id === "urbana") {
    document.getElementById("rural").checked = false;
    document.getElementById("subrural").checked = false;
  } else if (id === "rural") {
    document.getElementById("urbana").checked = false;
    document.getElementById("subrural").checked = false;
  } else if (id === "subrural") {
    document.getElementById("urbana").checked = false;
    document.getElementById("rural").checked = false;
  }
}
