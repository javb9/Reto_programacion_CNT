
var date_consult = document.getElementById('date_consult');
var resets = document.getElementById('reset');

if (resets) {
    resets.addEventListener('click', reset)
}

function reset() {
    $("#old_yes_diet").fadeOut(0);
    $("#old").fadeOut(0);
    $("#young_yes_smoke").fadeOut(0);
    $("#young").fadeOut(0);
    $("#children").fadeOut(0);
}

if (date_consult) {
    date_consult.value = new Intl.DateTimeFormat('es-CO', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date()).split('/').reverse().join('-');
}

//get in to pediatria

// back of new_pacient.html
var back = document.getElementById("btn_new_pacient_back");
if (back) {
    back.addEventListener("click", back_new_pacient)
}
function back_new_pacient() {
    window.location = '/';
}
// get in new_pacient.html
var new_pa = document.getElementById("new_pacient");
if (new_pa) {
    new_pa.addEventListener("click", new_pacient);
}

function new_pacient() {
    window.location.href = 'new_pacient.html'
}
// get in new_profesional
var new_pr = document.getElementById("new_profesional");
if (new_pr) {
    new_pr.addEventListener("click", new_profesional);
}

function new_profesional() {
    window.location.href = 'new_profesional.html'
}

// get in consult
var consulta = document.getElementById('consult');
if (consulta) {
    consulta.addEventListener("click", consult);
}
function consult() {
    window.location = "consult.html";
}
// date in the footer
function fecha() {
    var fecha = document.getElementById("fecha");
    fecha.innerHTML = "Reto Programacion CNT" + " " + "- " + new Intl.DateTimeFormat('es-CO', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date()).split('/').reverse().join('-') + "<br>" + "Javier Alexander Becerra Vega";
}
fecha();




