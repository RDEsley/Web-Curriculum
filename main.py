from flask import Flask, render_template, request, redirect, url_for
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import Usuario
from db import db

app = Flask(__name__)
app.secret_key = "secreta"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
lm = LoginManager(app)
lm.login_view = "login"


@lm.user_loader
def user_loader(id):
    return Usuario.query.get(int(id))


@app.route("/")
@login_required
def home():
    return render_template("home.html", usuario=current_user.nome)


@app.route("/registrar", methods=["GET", "POST"])
def registrar():
    if request.method == "POST":
        nome = request.form["nome"]
        senha = request.form["senha"]
        confirmacao = request.form["confirmacao"]

        if senha != confirmacao:
            return "As senhas não coincidem. Tente novamente."

        if Usuario.query.filter_by(nome=nome).first():
            return "Usuário já existe. Tente outro nome."

        senha_hash = generate_password_hash(senha)
        novo_usuario = Usuario(nome=nome, senha=senha_hash)
        db.session.add(novo_usuario)
        db.session.commit()
        login_user(novo_usuario)
        return redirect(url_for("home"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        nome = request.form["nome"]
        senha = request.form["senha"]

        usuario = Usuario.query.filter_by(nome=nome).first()
        if usuario and check_password_hash(usuario.senha, senha):
            login_user(usuario)
            return redirect(url_for("home"))
        else:
            return "Credenciais inválidas. Tente novamente."

    return render_template("login.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
