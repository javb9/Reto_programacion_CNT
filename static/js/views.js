var pediatria_btn = document.getElementById('pediatria');
var medicina_integral_btn = document.getElementById('medicina_integral');
var urgencias_btn = document.getElementById('urgencias');

var btn_atender_paciente_pediatria = document.getElementById('btn_atender_paciente_pediatria');
var btn_atender_paciente_MI = document.getElementById('btn_atender_paciente_MI');
var btn_atender_paciente_urgencias = document.getElementById('btn_atender_paciente_urgencias');

if (btn_atender_paciente_pediatria) {
    btn_atender_paciente_pediatria.addEventListener('click', atender_pediatria);
}

if (btn_atender_paciente_MI) {
    btn_atender_paciente_MI.addEventListener('click', atender_MI)
}

if (btn_atender_paciente_urgencias) {
    btn_atender_paciente_urgencias.addEventListener('click', atender_urgencias);
}
if (pediatria_btn) {
    pediatria_btn.addEventListener('click', view_pediatria);
}
if (medicina_integral_btn) {
    medicina_integral_btn.addEventListener('click', view_MI);
}
if (urgencias_btn) {
    urgencias_btn.addEventListener('click', view_urgencias);
}




function view_pediatria() {
    window.location = '/pediatria';
}
function view_MI() {
    window.location = '/MI';
}
function view_urgencias() {
    window.location = '/urgencias';
}
const DOMpediatria = document.querySelector('#pediatria_t');
const DOM_MI = document.querySelector('#MI');
const DOMurgencias = document.querySelector('#view_urgencias');
const DOMatencion_urgencias = document.querySelector('#atencion_urg');

if (DOMpediatria) {
    var tipo_consulta = 1;

    $.ajax({
        type: 'POST',
        url: '/view_pediatria',
        data: { 'data': tipo_consulta },
        success: function (info) {
            var res = JSON.parse(info);
            console.log(res);

            const div = document.getElementById('div');
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr')
            const th_T1 = document.createElement('th');
            const th_T2 = document.createElement('th');
            const th_T3 = document.createElement('th');
            const th_T4 = document.createElement('th');
            table.className = 'table table-striped';
            th_T1.innerHTML = 'NOMBRE';
            th_T2.innerHTML = 'ID_PACIENTE';
            th_T3.innerHTML = 'ESTADO';
            th_T4.innerHTML = 'PRIORIDAD';
            tr.appendChild(th_T1);
            tr.appendChild(th_T2);
            tr.appendChild(th_T3);
            tr.appendChild(th_T4);
            thead.appendChild(tr);
            res.forEach(el => {
                const tr = document.createElement('tr');
                for (let prop in el) {
                    const td = document.createElement("td");
                    td.innerHTML = `${el[prop]}`;
                    tr.appendChild(td);
                    console.log(el[prop]);
                    thead.appendChild(tr);
                }
            });

            table.appendChild(thead);
            DOMpediatria.appendChild(table);
            div.appendChild(DOMpediatria);

        },
        error: function (error) {
            console.log('Error', error);
        }
    });
} else if (DOM_MI) {
    var tipo_consulta = 3;

    $.ajax({
        type: 'POST',
        url: '/view_MI',
        data: { 'data': tipo_consulta },
        success: function (info) {
            var res = JSON.parse(info);
            console.log(res);

            const div_MI = document.getElementById('div_MI');
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tr = document.createElement('tr')
            const th_T1 = document.createElement('th');
            const th_T2 = document.createElement('th');
            const th_T3 = document.createElement('th');
            const th_T4 = document.createElement('th');
            table.className = 'table table-striped';
            th_T1.innerHTML = 'NOMBRE';
            th_T2.innerHTML = 'ID_PACIENTE';
            th_T3.innerHTML = 'ESTADO';
            th_T4.innerHTML = 'PRIORIDAD';
            tr.appendChild(th_T1);
            tr.appendChild(th_T2);
            tr.appendChild(th_T3);
            tr.appendChild(th_T4);
            thead.appendChild(tr);
            res.forEach(el => {
                const tr = document.createElement('tr');
                for (let prop in el) {
                    const td = document.createElement("td");
                    td.innerHTML = `${el[prop]}`;
                    tr.appendChild(td);
                    console.log(el[prop]);
                    thead.appendChild(tr);
                }
            });

            table.appendChild(thead);
            DOM_MI.appendChild(table);
            div_MI.appendChild(DOM_MI);

        },
        error: function (error) {
            console.log('Error', error);
        }
    });
} else if (DOMurgencias) {
    var tipo_consulta = 2;

    $.ajax({
        type: 'POST',
        url: '/view_urgencias',
        data: { 'data': tipo_consulta },
        success: function (info) {
            var res = JSON.parse(info);
            console.log(res);

            const div_urgencias = document.getElementById('div_urgencias');
            const table_urgencias = document.createElement('table');
            const thead_urgencias = document.createElement('thead');
            const tr_urgencias = document.createElement('tr')
            const th_T1_urgencias = document.createElement('th');
            const th_T2_urgencias = document.createElement('th');
            const th_T3_urgencias = document.createElement('th');
            const th_T4_urgencias = document.createElement('th');
            table_urgencias.className = 'table table-striped';
            th_T1_urgencias.innerHTML = 'NOMBRE';
            th_T2_urgencias.innerHTML = 'ID_PACIENTE';
            th_T3_urgencias.innerHTML = 'ESTADO';
            th_T4_urgencias.innerHTML = 'PRIORIDAD';
            tr_urgencias.appendChild(th_T1_urgencias);
            tr_urgencias.appendChild(th_T2_urgencias);
            tr_urgencias.appendChild(th_T3_urgencias);
            tr_urgencias.appendChild(th_T4_urgencias);
            thead_urgencias.appendChild(tr_urgencias);
            res.forEach(el => {
                const tr_urgencias = document.createElement('tr');
                for (let prop in el) {
                    const td_urgencias = document.createElement("td");
                    td_urgencias.innerHTML = `${el[prop]}`;
                    tr_urgencias.appendChild(td_urgencias);
                    console.log(el[prop]);
                    thead_urgencias.appendChild(tr_urgencias);
                }
            });

            table_urgencias.appendChild(thead_urgencias);
            DOMurgencias.appendChild(table_urgencias);
            div_urgencias.appendChild(DOMurgencias);

        },
        error: function (error) {
            console.log('Error', error);
        }
    });
}
function atender_urgencias() {
    var tipo_consulta = 2;
    $.ajax({
        type: 'post',
        url: '/atencion_urg',
        data: { 'data': tipo_consulta },
        success: function (res) {
            var resp = JSON.parse(res);
            var r = resp[0][1];
            $.ajax({
                type: 'post',
                url: 'act_estado_urgencias',
                data: { 'data': r },
                success: function (info) {
                    var estado = 2;
                    console.log(info);
                    var resp = info;
                    $.ajax({
                        type: 'POST',
                        url: '/finalizar_consulta',
                        data: {
                            'data': estado,
                            'data_2': resp
                        },
                        success: function (res) {
                            console.log(res);
                            window.location = '/urgencias';
                        },
                        error: function (error) {
                            console.log('error', error);
                        }
                    });
                },
                error: function (error) {
                    console.log('Error', error);
                }
            })
        },
        error: function (res) {
            console.log('error : ' + res);
        }
    });
}
function atender_MI() {
    var tipo_consulta = 3;
    $.ajax({
        type: 'post',
        url: '/atencion_MI',
        data: { 'data': tipo_consulta },
        success: function (res) {
            var resp = JSON.parse(res);
            var r = resp[0][1];
            $.ajax({
                type: 'post',
                url: 'act_estado_MI',
                data: { 'data': r },
                success: function (info) {
                    var estado = 2;
                    console.log(info);
                    var resp = info;
                    $.ajax({
                        type: 'POST',
                        url: '/finalizar_consulta_MI',
                        data: {
                            'data': estado,
                            'data_2': resp
                        },
                        success: function (res) {
                            console.log(res);
                            window.location = '/MI';
                        },
                        error: function (error) {
                            console.log('error', error);
                        }
                    });
                },
                error: function (error) {
                    console.log('Error', error);
                }
            })
        },
        error: function (res) {
            console.log('error : ' + res);
        }
    });
}

function atender_pediatria() {
    var tipo_consulta = 1;
    $.ajax({
        type: 'post',
        url: '/atencion_pediatria',
        data: { 'data': tipo_consulta },
        success: function (res) {
            var resp = JSON.parse(res);
            var r = resp[0][1];
            $.ajax({
                type: 'post',
                url: 'act_estado_pediatria',
                data: { 'data': r },
                success: function (info) {
                    var estado = 2;
                    console.log(info);
                    var resp = info;
                    $.ajax({
                        type: 'POST',
                        url: '/finalizar_consulta_pediatria',
                        data: {
                            'data': estado,
                            'data_2': resp
                        },
                        success: function (res) {
                            console.log(res);
                            window.location = '/pediatria';
                        },
                        error: function (error) {
                            console.log('error', error);
                        }
                    });
                },
                error: function (error) {
                    console.log('Error', error);
                }
            })
        },
        error: function (res) {
            console.log('error : ' + res);
        }
    });
}