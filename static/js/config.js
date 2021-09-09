var edad = document.getElementById("date");
var number_document = document.getElementById("number_document_p");
var priority = document.getElementById("prioridad");
var risk = document.getElementById("riesgo");
var number_document_pro = document.getElementById('number_document_pro');
var type_consult = document.getElementById('type_consult');
var btn_consult_history = document.getElementById('btn_consult_history');
var name_p = document.getElementById('name_p');
var type_of_document_p = document.getElementById('type_of_document_p');
var date_consult = document.getElementById('date_consult');
var btn_paciente_mayor_riesgo = document.getElementById('btn_paciente_mayor_riesgo');
var btn_fumador_urgente=document.getElementById('fumador_urgente');
var btn_mas_anciano=document.getElementById('mas_anciano');
var tipo = 0;
if(btn_mas_anciano){
    btn_mas_anciano.addEventListener('click', mas_anciano) 
}
if(btn_fumador_urgente){
    btn_fumador_urgente.addEventListener('click', fumador_urgente);
}
if (btn_paciente_mayor_riesgo) {
    btn_paciente_mayor_riesgo.addEventListener('click', paciente_riesgo);
}
if (btn_consult_history) {
    btn_consult_history.addEventListener('click', consult_history_f);
}

if (number_document_pro) {
    $("#number_document_pro").focusout(function () {
        date_consult.value = new Intl.DateTimeFormat('es-CO', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date()).split('/').reverse().join('-');
        var number_document_send = $('#number_document_pro').val();
        $.ajax({
            type: 'post',
            url: '/send_ID_validate_pro',
            data: { 'data': number_document_send },
            success: function (res) {
                if (res !== '') {
                    document.getElementById('name_pro').value = JSON.parse(res);
                } else {
                    document.getElementById('name_pro').value = '';
                    document.getElementById('alert').innerHTML = "Profesional no registrado";
                    $("#alert").fadeIn(100);
                    setTimeout(function () {
                        $("#alert").fadeOut(300);
                    }, 1500);
                }
            }
        });
    });
}

if (edad) {
    $("#number_document_p").focusout(function () {
        $("#old_yes_diet").fadeOut(0);
        $("#old").fadeOut(0);
        $("#young_yes_smoke").fadeOut(0);
        $("#young").fadeOut(0);
        $("#children").fadeOut(0);
        var number_document_send = $('#number_document_p').val();
        $.ajax({
            type: 'post',
            url: '/send_ID_validate',
            data: { 'data': number_document_send },
            success: function (res) {
                if (res !== '') {
                    console.log(res);
                    var fech = res.date[0];
                    var fec = Date.parse(fech);
                    var fecha_nac = new Date(fec);
                    var fecha_a = (fecha_nac.getDate() + 1) + "/" + (fecha_nac.getMonth() + 1) + "/" + fecha_nac.getFullYear();
                    edad.value = fecha_a;
                    name_p.value = res.name;
                    type_of_document_p.value = res.cc

                    var today = new Date();
                    //Restamos los años
                    var años = today.getFullYear() - fecha_nac.getFullYear();
                    // Si no ha llegado su cumpleaños le restamos el año por cumplir
                    if (fecha_nac.getMonth() > (today.getMonth()) || fecha_nac.getDate() > today.getDay()) {
                        años--;
                    }
                    console.log('años:' + años);
                    if (años >= 1 && años <= 15) {

                        $("#children").fadeIn(100);

                        $("#peso_estatura").focusout(function () {
                            var peso_estatura = parseInt($(this).val());
                            console.log(peso_estatura);
                            if (años > 0 && años < 6) {
                                prioridad = peso_estatura + 3;
                                riesgo = (años * prioridad) / 100;
                                priority.value = prioridad;
                                risk.value = riesgo;

                            } else if (años > 5 && años < 13) {
                                prioridad = peso_estatura + 2;
                                riesgo = (años * prioridad) / 100;
                                priority.value = prioridad;
                                risk.value = riesgo;
                            } else if (años > 12 && años < 16) {
                                prioridad = peso_estatura + 1;
                                riesgo = (edad * prioridad) / 100;
                                priority.value = prioridad;
                                risk.value = riesgo;
                            }
                            if (prioridad <= 4) {
                                type_consult.value = 1;
                            } else {
                                type_consult.value = 2;
                            }
                        });


                    } else if (años > 15 && años < 41) {

                        $("#young").fadeIn(100);
                        $("#fumador").focusout(function () {
                            var yes_or_no = $(this).val();
                            if (yes_or_no == "SI") {
                                $("#young_yes_smoke").fadeIn(100);
                                $("#years_smoker").focusout(function () {
                                    var años_fum = $(this).val();
                                    prioridad = (años_fum / 4) + 2;
                                    riesgo = (años * prioridad) / 100;
                                    priority.value = prioridad;
                                    risk.value = riesgo;
                                    if (años_fum < 0) {
                                        document.getElementById('alert').innerHTML = "ingrese valor valido";
                                        $("#alert").fadeIn(100);
                                        setTimeout(function () {
                                            $("#alert").fadeOut(300);
                                        }, 1500);
                                    }
                                    if (prioridad <= 4) {
                                        type_consult.value = 3;
                                    } else {
                                        type_consult.value = 2;
                                    }
                                });
                            } else if (yes_or_no == "NO") {
                                prioridad = 2;
                                riesgo = (edad * prioridad) / 100;
                                priority.value = prioridad;
                                risk.value = riesgo;
                                if (prioridad <= 4) {
                                    type_consult.value = 3;
                                } else {
                                    type_consult.value = 2;
                                }
                                console.log(type_consult.value);
                            }
                        });

                    } else if (años > 40) {

                        $("#old").fadeIn(100);
                        $("#dieta").focusout(function () {
                            var dieta = $(this).val();
                            if (dieta == "si") {
                                $("#old_yes_diet").fadeIn(100);
                                $("#type_dieta").focusout(function () {
                                    if (años > 59) {
                                        prioridad = (años / 20) + 4;
                                        riesgo = ((años * prioridad) / 100) + 5.3;
                                        priority.value = prioridad;
                                        risk.value = riesgo;
                                    }
                                    if (prioridad <= 4) {
                                        type_consult.value = 3;
                                    } else if (prioridad > 4) {
                                        type_consult.value = 2;
                                    }
                                });
                            } else if (dieta == "no") {
                                prioridad = (años / 30) + 3;
                                riesgo = ((años * prioridad) / 100) + 5.3;
                                priority.value = prioridad;
                                risk.value = riesgo;
                                if (prioridad <= 4) {
                                    type_consult.value = 3;
                                } else if (prioridad > 4) {
                                    type_consult.value = 2;
                                }
                            }

                        });
                    }
                } else {
                    document.getElementById('name_p').value = '';
                    document.getElementById('alert').innerHTML = "Paciente no registrado";
                    $("#alert").fadeIn(100);
                    setTimeout(function () {
                        $("#alert").fadeOut(300);
                    }, 1500);
                    type_of_document_p.value = ' ';
                    edad.value = ' ';
                    $("#old_yes_diet").fadeOut(0);
                    $("#old").fadeOut(0);
                    $("#young_yes_smoke").fadeOut(0);
                    $("#young").fadeOut(0);
                    $("#children").fadeOut(0);
                }
            }
        });
    });
}
function consult_history_f() {
    var DOMhistoria = document.getElementById('DOMhistoria');
    var consult_history = $("#number_document_p").val();
    $.ajax({
        type: 'post',
        url: '/consult_history',
        data: { 'data': consult_history },
        success: function (res) {
            var resp = JSON.parse(res);
            console.log(resp);
            DOMhistoria.innerHTML = " ";
            const div_body = document.getElementById('modal_body');
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr')
            const th_T1 = document.createElement('th');
            const th_T2 = document.createElement('th');
            const th_T3 = document.createElement('th');
            const th_T4 = document.createElement('th');
            const th_T5 = document.createElement('th');
            const th_T6 = document.createElement('th');
            table.className = 'table table-striped';
            th_T1.innerHTML = 'PROFESIONAL';
            th_T2.innerHTML = 'TIPO DE CONSULTA';
            th_T3.innerHTML = 'R. PESO-ESTATURA';
            th_T4.innerHTML = 'FUMADOR';
            th_T5.innerHTML = 'AÑOS DE FUMADOR';
            th_T6.innerHTML = 'DIETA';
            tr.appendChild(th_T1);
            tr.appendChild(th_T2);
            tr.appendChild(th_T3);
            tr.appendChild(th_T4);
            tr.appendChild(th_T5);
            tr.appendChild(th_T6);
            thead.appendChild(tr);
            resp.forEach(el => {
                const tr = document.createElement('tr');
                for (let prop in el) {
                    const td = document.createElement("td");
                    if (el[prop] == null) {
                        el[prop] = 'N/A';
                    }
                    td.innerHTML = `${el[prop]}`;
                    tr.appendChild(td);
                    console.log(el[prop]);
                    thead.appendChild(tr);
                }
            });

            table.appendChild(thead);
            DOMhistoria.appendChild(table);
        },
        error: function (error) {
            console.log('Error', error);
            document.getElementById('alert').innerHTML = "El paciente no tiene historial medico";
            $("#alert").fadeIn(100);
            setTimeout(function () {
                $("#alert").fadeOut(300);
            }, 1500);
        }
    });

}
function paciente_riesgo() {
    var DOMmayor_riesgo = document.getElementById('DOMmayor_riesgo');
    var paciente_mayor_riesgo = $("#number_document_p").val();
    $.ajax({
        type: 'post',
        url: '/paciente_mayor_riesgo',
        data: { 'data': paciente_mayor_riesgo },
        success: function (res) {
            var resp_riesgo = JSON.parse(res);
            console.log(resp_riesgo);
            DOMmayor_riesgo.innerHTML = " ";
            const table_riesgo = document.createElement('table');
            const thead_riesgo = document.createElement('thead');
            const tr_riesgo = document.createElement('tr')
            const th_T1_riesgo = document.createElement('th');
            const th_T2_riesgo = document.createElement('th');
            const th_T3_riesgo = document.createElement('th');
            const th_T4_riesgo = document.createElement('th');
            table_riesgo.className = 'table table-striped';
            th_T1_riesgo.innerHTML = 'NUMERO DE DOCUMENTO';
            th_T2_riesgo.innerHTML = 'TIPO DE DOCUMENTO';
            th_T3_riesgo.innerHTML = 'NOMBRE';
            th_T4_riesgo.innerHTML = 'RIESGO';
            tr_riesgo.appendChild(th_T1_riesgo);
            tr_riesgo.appendChild(th_T2_riesgo);
            tr_riesgo.appendChild(th_T3_riesgo);
            tr_riesgo.appendChild(th_T4_riesgo);
            thead_riesgo.appendChild(tr_riesgo);
            resp_riesgo.forEach(el => {
                const tr_riesgo = document.createElement('tr');
                for (let prop in el) {
                    const td_riesgo = document.createElement("td");
                    td_riesgo.innerHTML = `${el[prop]}`;
                    tr_riesgo.appendChild(td_riesgo);
                    console.log(el[prop]);
                    thead_riesgo.appendChild(tr_riesgo);
                }
            });
            table_riesgo.appendChild(thead_riesgo);
            DOMmayor_riesgo.appendChild(table_riesgo);
        },
        error: function (error) {
            console.log('Error', error);
        }
    });
}
function fumador_urgente(){
    var DOMfumador_urgente=document.getElementById('DOMfumador_urgente');
    $.ajax({
        type: 'post',
        url: '/fumador_urgente',
        data: { },
        success: function (res) {
            var resp_fumador_urgente = JSON.parse(res);
            console.log(resp_fumador_urgente);
            DOMfumador_urgente.innerHTML = " ";
            const table_fumador_urgente = document.createElement('table');
            const thead_fumador_urgente = document.createElement('thead');
            const tr_fumador_urgente = document.createElement('tr')
            const th_T1_fumador_urgente = document.createElement('th');
            const th_T2_fumador_urgente = document.createElement('th');
            const th_T3_fumador_urgente = document.createElement('th');
            const th_T4_fumador_urgente = document.createElement('th');
            table_fumador_urgente.className = 'table table-striped';
            th_T1_fumador_urgente.innerHTML = 'NOMBRE';
            th_T2_fumador_urgente.innerHTML = 'NUMERO DE DOCUMENTO';
            th_T3_fumador_urgente.innerHTML = 'AÑOS FUMANDO';
            th_T4_fumador_urgente.innerHTML = 'RIESGO';
            tr_fumador_urgente.appendChild(th_T1_fumador_urgente);
            tr_fumador_urgente.appendChild(th_T2_fumador_urgente);
            tr_fumador_urgente.appendChild(th_T3_fumador_urgente);
            tr_fumador_urgente.appendChild(th_T4_fumador_urgente);
            thead_fumador_urgente.appendChild(tr_fumador_urgente);
            resp_fumador_urgente.forEach(el => {
                const tr_fumador_urgente = document.createElement('tr');
                for (let prop in el) {
                    const td_fumador_urgente = document.createElement("td");
                    td_fumador_urgente.innerHTML = `${el[prop]}`;
                    tr_fumador_urgente.appendChild(td_fumador_urgente);
                    console.log(el[prop]);
                    thead_fumador_urgente.appendChild(tr_fumador_urgente);
                }
            });
            table_fumador_urgente.appendChild(thead_fumador_urgente);
            DOMfumador_urgente.appendChild(table_fumador_urgente);
        },
        error: function (error) {
            console.log('Error', error);
        }
    });
}
function mas_anciano(){
    var DOMmas_anciano = document.getElementById('DOMmas_anciano');
    
    $.ajax({
        type: 'post',
        url: '/mas_viejo',
        data: { },
        success: function (res) {
            var resp_mas_viejo = JSON.parse(res);
            console.log(resp_mas_viejo);
            DOMmas_anciano.innerHTML = " ";
            const table_mas_viejo = document.createElement('table');
            const thead_mas_viejo = document.createElement('thead');
            const tr_mas_viejo = document.createElement('tr')
            const th_T1_mas_viejo = document.createElement('th');
            const th_T2_mas_viejo = document.createElement('th');
            const th_T3_mas_viejo = document.createElement('th');
            table_mas_viejo.className = 'table table-striped';
            th_T1_mas_viejo.innerHTML = 'NUMERO DE DOCUMENTO';
            th_T2_mas_viejo.innerHTML = 'NOMBRE';
            th_T3_mas_viejo.innerHTML = 'EDAD';
            tr_mas_viejo.appendChild(th_T1_mas_viejo);
            tr_mas_viejo.appendChild(th_T2_mas_viejo);
            tr_mas_viejo.appendChild(th_T3_mas_viejo);
            thead_mas_viejo.appendChild(tr_mas_viejo);
            resp_mas_viejo.forEach(el => {
                const tr_mas_viejo = document.createElement('tr');
                for (let prop in el) {
                    const td_mas_viejo = document.createElement("td");
                    td_mas_viejo.innerHTML = `${el[prop]}`;
                    tr_mas_viejo.appendChild(td_mas_viejo);
                    console.log(el[prop]);
                    thead_mas_viejo.appendChild(tr_mas_viejo);
                }
            });

            table_mas_viejo.appendChild(thead_mas_viejo);
            DOMmas_anciano.appendChild(table_mas_viejo);
        },
        error: function (error) {
            console.log('Error', error);
        }
    });
}
