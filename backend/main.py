from flask import Flask, render_template, request, redirect
from models import Usuario
from db import db  # Importando db
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Evitar advertências

db.init_app(app)  # Inicializar db com o app

@app.route('/registrar', methods=['GET', 'POST'])
def registrar():
    if request.method == 'GET':
        return render_template('registrar.html')
    elif request.method == 'POST':
        nome = request.form['nomeForm']
        senha = request.form['senhaForm']
        
        novo_usuario = Usuario(nome=nome, senha=senha)
        
        db.session.add(novo_usuario)
        db.session.commit()
        
        return redirect('/success')  # Redirecionar após sucesso

@app.route('/success')
def success():
    return 'Usuário registrado com sucesso!'

if __name__ == '__main__':
    with app.app_context():  # Garantir o contexto do app ao criar o banco
        db.create_all()  # Criação das tabelas no banco de dados
    app.run(debug=True)
