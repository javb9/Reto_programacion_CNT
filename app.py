import datetime
import re
from sys import meta_path
from MySQLdb import cursors
from MySQLdb.cursors import Cursor
from flask import Flask, render_template, request
from flask.json import jsonify
from flask_mysqldb import MySQL
import json

import jinja2

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bd_clinica'
mysql = MySQL(app)


@app.route('/')
def index():
    return render_template('index.html')


# validar identificacion

@app.route('/send_ID_validate', methods=['post'])
def send_ID_validate():
    number_document_send = request.form['data']
    cursor_name = mysql.connection.cursor()
    cursor_name.execute('SELECT NOMBRE FROM paciente WHERE NUMERO_DOCUMENTO = %s',
                        (number_document_send,))
    cursor_cc = mysql.connect.cursor()
    cursor_cc.execute('SELECT TIPO_DOCUMENTO FROM paciente WHERE NUMERO_DOCUMENTO = %s',
                      (number_document_send,))
    cursor_date = mysql.connection.cursor()
    cursor_date.execute('SELECT FECHA_NACIMIENTO FROM paciente WHERE NUMERO_DOCUMENTO = %s',
                        (number_document_send,))
    for dates_date in cursor_date:
        date_date = dates_date
        for dates_name in cursor_name:
            date_name = dates_name
            for dates_cc in cursor_cc:
                date_cc = dates_cc

                dates_send = {"cc": date_cc,
                              "name": date_name, "date": date_date}
                return jsonify(dates_send)
    return ''


@app.route('/send_ID_validate_pro', methods=['post'])
def send_ID_validate_pro():
    number_document_send = request.form['data']
    cur = mysql.connection.cursor()
    cur.execute('SELECT NOMBRE FROM profesional WHERE NUMERO_DOCUMENTO = %s',
                (number_document_send,))
    for data in cur:
        return str(json.dumps(data))

    return ''

#   vistas


@app.route('/new_pacient.html')
def new_pacient():
    return render_template('new_pacient.html')


@app.route('/new_profesional.html')
def new_profesional():
    return render_template('new_profesional.html')


@app.route('/consult.html')
def consult():
    return render_template('consult.html')

@app.route('/pediatria')
def pediatriaTemplate():
    return render_template('view_pediatria.html')

@app.route('/MI')
def MITemplate():
    return render_template('view_MI.html')

@app.route('/urgencias')
def urgenciasTemplate():
    return render_template('view_urgencias.html')

@app.route('/atencion_urgencias')
def atencion_urgencias():
    return render_template('atencion_urgencias.html')

#VISTAS PARA ATENCION AL PACIENTE 

@app.route('/view_pediatria', methods=['POST'])
def view_pediatria():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        pacientes = cur.fetchall()
        datos = str(json.dumps(pacientes))
        return datos

@app.route('/view_MI', methods=['POST'])
def view_MI():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        pacientes = cur.fetchall()
        datos = str(json.dumps(pacientes))
        return datos

@app.route('/view_urgencias', methods=['POST'])
def view_urgencias():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        pacientes = cur.fetchall()
        datos = str(json.dumps(pacientes))
        return datos

@app.route('/atencion_urg', methods=['POST'])
def atencion_urg():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC LIMIT 1',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        paciente = cur.fetchall()
        dato = str(json.dumps(paciente))
        return dato
    
@app.route('/act_estado_urgencias', methods=['POST'])
def act_estado_urgencias():
    if request.method=='POST':
        cedula=request.form['data']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta c JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=1 WHERE p.NUMERO_DOCUMENTO=%s',
            (cedula,)
        )
        mysql.connection.commit()
        return cedula
    else:
        return 'no'

@app.route('/finalizar_consulta', methods=['POST'])
def finalizar_consulta():
    if request.method=='POST':
        estado=request.form['data']
        cedula=request.form['data_2']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta C JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=%s WHERE p.NUMERO_DOCUMENTO=%s',
            (estado,cedula)
        )
        mysql.connection.commit()
        return 'si'
    else:
        return 'no'

@app.route('/atencion_MI', methods=['POST'])
def atencion_MI():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC LIMIT 1',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        paciente = cur.fetchall()
        dato = str(json.dumps(paciente))
        return dato
    
@app.route('/act_estado_MI', methods=['POST'])
def act_estado_MI():
    if request.method=='POST':
        cedula=request.form['data']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta c JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=1 WHERE p.NUMERO_DOCUMENTO=%s',
            (cedula,)
        )
        mysql.connection.commit()
        return cedula
    else:
        return 'no'

@app.route('/finalizar_consulta_MI', methods=['POST'])
def finalizar_consulta_MI():
    if request.method=='POST':
        estado=request.form['data']
        cedula=request.form['data_2']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta C JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=%s WHERE p.NUMERO_DOCUMENTO=%s',
            (estado,cedula)
        )
        mysql.connection.commit()
        return 'si'
    else:
        return 'no'

@app.route('/atencion_pediatria', methods=['POST'])
def atencion_pediatria():
    if request.method=='POST':
        tipo_consulta=request.form['data']
        cur = mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, e.NOMBRE as Estado, p.PRIORIDAD FROM  paciente p INNER JOIN consulta c ON c.ID_PACIENTE=p.NUMERO_DOCUMENTO INNER JOIN estado e ON e.ID=c.ID_ESTADO WHERE c.ID_TIPO_CONSULTA=%s AND e.ID=3 ORDER BY prioridad DESC LIMIT 1',
            (tipo_consulta,)
        )
        mysql.connection.commit()
        paciente = cur.fetchall()
        dato = str(json.dumps(paciente))
        return dato
    
@app.route('/act_estado_pediatria', methods=['POST'])
def act_estado_pediatria():
    if request.method=='POST':
        cedula=request.form['data']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta c JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=1 WHERE p.NUMERO_DOCUMENTO=%s',
            (cedula,)
        )
        mysql.connection.commit()
        return cedula
    else:
        return 'no'

@app.route('/finalizar_consulta_pediatria', methods=['POST'])
def finalizar_consulta_pediatria():
    if request.method=='POST':
        estado=request.form['data']
        cedula=request.form['data_2']
        cur=mysql.connection.cursor()
        cur.execute(
            'UPDATE consulta C JOIN paciente p ON p.NUMERO_DOCUMENTO=c.ID_PACIENTE SET c.ID_ESTADO=%s WHERE p.NUMERO_DOCUMENTO=%s',
            (estado,cedula)
        )
        mysql.connection.commit()
        return 'si'
    else:
        return 'no'
# registro pacientes y profesionales


@app.route('/new_pacient_register', methods=['post'])
def new_pacient_register():
    if request.method == 'POST':
        tipo_de_documento = request.form['type_of_document']
        numero_de_documento = request.form['number_of_document']
        nombre = request.form['name']
        fecha = request.form['date']
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO paciente (NUMERO_DOCUMENTO, TIPO_DOCUMENTO, NOMBRE, FECHA_NACIMIENTO) VALUES (%s, %s, %s, %s)',
                    (numero_de_documento, tipo_de_documento, nombre, fecha))
        mysql.connection.commit()
        return 'si'


@app.route('/new_profesional_register', methods=['post'])
def new_profesional_register():
    if request.method == 'POST':
        tipo_de_documento = request.form['type_of_document_p']
        numero_de_documento = request.form['number_of_document']
        nombre = request.form['name']
        fecha = request.form['date']
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO profesional (NUMERO_DOCUMENTO, TIPO_DOCUMENTO, NOMBRE, FECHA_NACIMIENTO) VALUES (%s, %s, %s, %s)',
                    (numero_de_documento, tipo_de_documento, nombre, fecha))
        mysql.connection.commit()
        return 'si'


# envio de datos de paciente a base de datos consulta


@app.route('/send_consult', methods=['post'])
def send_consult():
    if request.method == 'POST':
        id_paciente = request.form['number_document_p']
        id_profesioanl = request.form['number_document_pro']
        id_tipo_consulta = request.form['type_consult']
        prioridad = request.form['prioridad']
        riesgo = request.form['riesgo']
        peso_estatura = request.form['peso_estatura']
        dieta = request.form['type_dieta']
        fumador = request.form['fumador']
        anhos_fumador = request.form['years_smoker']
        cur_1=mysql.connection.cursor()
        cur = mysql.connection.cursor()
        cursor = mysql.connection.cursor()
        cur.execute(
            'INSERT INTO consulta (ID_PACIENTE, ID_PROFESIONAL, ID_TIPO_CONSULTA, FECHA) VALUES (%s,%s,%s, CURRENT_TIMESTAMP)',
            (id_paciente, id_profesioanl, id_tipo_consulta))
        mysql.connection.commit()
        cur.execute(
            'UPDATE paciente SET PRIORIDAD=%s WHERE NUMERO_DOCUMENTO=%s', (prioridad, id_paciente))
        mysql.connection.commit()
        cur.execute(
            'UPDATE paciente SET RIESGO=%s WHERE NUMERO_DOCUMENTO=%s', (riesgo, id_paciente))
        mysql.connection.commit()
        cur_1.execute(
            'SELECT ID FROM consulta WHERE ID_PACIENTE=%s',(id_paciente,)
        )
        mysql.connection.commit()
        for consult in cur_1:
            consulta=consult
        cursor.execute(
            'INSERT INTO historia_clinica (ID_CONSULTA, ID_PACIENTE, PESO_ESTATURA, FUMADOR, ANHOS_FUMANDO, ID_DIETA, FECHA) VALUES (%s,%s,%s,%s,%s,%s, CURRENT_TIMESTAMP())',
            (consulta, id_paciente, peso_estatura, fumador, anhos_fumador, dieta))
        mysql.connection.commit()
        cursor.execute(
            'UPDATE historia_clinica SET PESO_ESTATURA=NULL WHERE PESO_ESTATURA=0'
        )
        mysql.connection.commit()
        cursor.execute(
            'UPDATE historia_clinica SET ANHOS_FUMANDO=NULL WHERE ANHOS_FUMANDO=0'
        )
        mysql.connection.commit()
        cursor.execute(
            'UPDATE historia_clinica SET FUMADOR=NULL WHERE FUMADOR=" "'
        )
        mysql.connection.commit()
        
        print(consulta)
        return 'si'
    else:
        return 'no'

# consultar historial medico


@app.route('/consult_history', methods=['post'])
def consult_history():
    if request.method == 'POST':
        consult_history = request.form['data']
        cur = mysql.connection.cursor()
        cur.execute('SELECT pr.NOMBRE AS profesional, tc.NOMBRE AS tipo_consulta, hc.PESO_ESTATURA, hc.FUMADOR, hc.ANHOS_FUMANDO, CASE WHEN hc.ID_DIETA IS NOT NULL THEN (SELECT NOMBRE from dieta WHERE ID=hc.ID_DIETA) ELSE NULL END as dieta FROM historia_clinica hc INNER JOIN consulta c ON c.ID_PACIENTE=hc.ID_PACIENTE AND c.ID=hc.ID_CONSULTA INNER JOIN paciente p ON p.NUMERO_DOCUMENTO = c.ID_PACIENTE INNER JOIN tipo_consulta tc ON tc.ID = c.ID_TIPO_CONSULTA INNER JOIN profesional pr ON pr.NUMERO_DOCUMENTO = c.ID_PROFESIONAL INNER JOIN estado e on e.ID = c.ID_ESTADO WHERE p.NUMERO_DOCUMENTO=%s ORDER BY c.FECHA ASC',
            (consult_history,)
            )
        mysql.connection.commit()
        historial = cur.fetchall()
        datos = str(json.dumps(historial))
        return datos 
        
    return 'no'

@app.route('/paciente_mayor_riesgo', methods=['POST'])
def paciente_mayor_riesgo():
    if request.method== 'POST':
        pacient_mayor_riesgo=request.form['data']
        cursor=mysql.connection.cursor()
        cursor.execute(
            'SELECT hc.ID FROM historia_clinica hc INNER JOIN paciente c ON c.NUMERO_DOCUMENTO=hc.ID_PACIENTE WHERE hc.ID_PACIENTE=%s',
            (pacient_mayor_riesgo,)
        )
        mysql.connection.commit()
        cur=mysql.connection.cursor()
        cur.execute(
            'SELECT p.NUMERO_DOCUMENTO, p.TIPO_DOCUMENTO, p.NOMBRE, p.RIESGO FROM paciente p WHERE (SELECT p.RIESGO FROM historia_clinica hc JOIN paciente p ON p.NUMERO_DOCUMENTO = hc.ID_PACIENTE WHERE hc.ID = %s) < p.RIESGO ORDER BY p.RIESGO DESC ',
            (cursor,)
        )
        mysql.connection.commit()
        paciente_riesgoso=cur.fetchall()
        datas=str(json.dumps(paciente_riesgoso))
        return datas
    

@app.route('/fumador_urgente', methods=['POST'])
def fumador_urgente():
    if request.method=='POST':
        cur=mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, hc.ANHOS_FUMANDO, p.RIESGO FROM paciente p INNER JOIN historia_clinica hc ON hc.ID_PACIENTE=p.NUMERO_DOCUMENTO WHERE hc.FUMADOR="SI" ORDER BY p.RIESGO DESC'
        )
        mysql.connection.commit()
        fumadores=cur.fetchall()
        datas=str(json.dumps(fumadores))
        return datas;

@app.route('/mas_viejo', methods=['POST'])
def mas_anciano():
    if request.method=='POST':
        cur=mysql.connection.cursor()
        cur.execute(
            'SELECT p.NOMBRE, p.NUMERO_DOCUMENTO, TIMESTAMPDIFF(YEAR, p.FECHA_NACIMIENTO, CURDATE()) AS edad FROM paciente p ORDER BY edad DESC LIMIT 1'
        )
        mysql.connection.commit()
        mas_viejo=cur.fetchall()
        datas=str(json.dumps(mas_viejo))
        return datas

if __name__ == '__main__':
    app.run(port=3000, debug=True)
