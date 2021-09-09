function send_new_pacient() {

    var alert = document.getElementById('alert');
    var tipo_de_documento = document.getElementById('type_of_document');
    var numero_de_documento = document.getElementById('number_of_document');
    var nombre = document.getElementById('name');
    var fecha = document.getElementById('date');

    $.ajax({
        type: 'post',
        url: '/new_pacient_register',
        data: $('#form_new_pacient').serialize(),
        success: function (respuesta) {
            $("#alert").removeClass("alert alert-danger");
            $("#alert").addClass("alert alert-primary");
            alert.innerHTML = 'Registro exitoso'
            $("#alert").fadeIn(100);
            setTimeout(function () {
                $("#alert").fadeOut(300);
            }, 1500);
            tipo_de_documento.value = " ";
            numero_de_documento.value = " ";
            nombre.value = " ";
            fecha.value = " ";
            console.log(respuesta);
        }
    });
}

function send_new_profesional() {

    var alert = document.getElementById('alert');
    var tipo_de_documento = document.getElementById('type_of_document');
    var numero_de_documento = document.getElementById('number_of_document');
    var nombre = document.getElementById('name');
    var fecha = document.getElementById('date');

    $.ajax({
        type: 'post',
        url: '/new_profesional_register',
        data: $('#form_new_profesional').serialize(),
        success: function (respuesta) {
            $("#alert").removeClass("alert alert-danger");
            $("#alert").addClass("alert alert-primary");
            alert.innerHTML = 'Registro exitoso'
            $("#alert").fadeIn(100);
            setTimeout(function () {
                $("#alert").fadeOut(300);
            }, 1500);
            tipo_de_documento.value = " ";
            numero_de_documento.value = " ";
            nombre.value = " ";
            fecha.value = " ";
            console.log(respuesta);
        }
    });
}
function send_consult() {

    var alert = document.getElementById('alert');

    $.ajax({
        type: 'post',
        url: '/send_consult',
        data: $('#form_consult').serialize(),
        success: function (respuesta) {
            $("#alert").removeClass("alert alert-danger");
            $("#alert").addClass("alert alert-primary");
            alert.innerHTML = 'Envio exitoso'
            $("#alert").fadeIn(100);
            setTimeout(function () {
                $("#alert").fadeOut(300);
            }, 1500);
            console.log(respuesta);
            $("#old_yes_diet").fadeOut(0);
            $("#old").fadeOut(0);
            $("#young_yes_smoke").fadeOut(0);
            $("#young").fadeOut(0);
            $("#children").fadeOut(0);
            
            console.log(respuesta);
        }
    });
}
