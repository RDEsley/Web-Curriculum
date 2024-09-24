from flask import Flask, request, jsonify
from app.models import Curriculo, db

app = Flask(__name__)

@app.route('/api/curriculos', methods=['GET', 'POST'])
def curriculos():
    if request.method == 'GET':
        curriculos = Curriculo.query.all()
        return jsonify([c.serialize() for c in curriculos])
    if request.method == 'POST':
        data = request.get_json()
        novo_curriculo = Curriculo(nome=data['nome'])
        db.session.add(novo_curriculo)
        db.session.commit()
        return jsonify(novo_curriculo.serialize()), 201

@app.route('/api/curriculos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def curriculo(id):
    curriculo = Curriculo.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(curriculo.serialize())
    if request.method == 'PUT':
        data = request.get_json()
        curriculo.nome = data['nome']
        db.session.commit()
        return jsonify(curriculo.serialize())
    if request.method == 'DELETE':
        db.session.delete(curriculo)
        db.session.commit()
        return '', 204
