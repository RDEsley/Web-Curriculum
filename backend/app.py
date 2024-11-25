from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app)  # Permitir requisições do frontend
Base = declarative_base()

# Configuração do banco de dados
DATABASE_URL = "sqlite:///certificados.db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Modelo para certificados
class Certificado(Base):
    __tablename__ = "certificados"
    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    instituicao = Column(String, nullable=False)
    ano = Column(Integer, nullable=False)
    url = Column(String)

Base.metadata.create_all(engine)

# Rotas
@app.route('/api/certificados', methods=['GET'])
def get_certificados():
    certificados = session.query(Certificado).all()
    return jsonify([{
        "id": c.id, "nome": c.nome, "instituicao": c.instituicao,
        "ano": c.ano, "url": c.url
    } for c in certificados])

@app.route('/api/certificados', methods=['POST'])
def add_certificado():
    data = request.json
    novo_certificado = Certificado(
        nome=data['nome'], instituicao=data['instituicao'], 
        ano=data['ano'], url=data.get('url')
    )
    session.add(novo_certificado)
    session.commit()
    return jsonify({"message": "Certificado adicionado com sucesso!"}), 201

@app.route('/api/certificados/<int:id>', methods=['PUT'])
def update_certificado(id):
    data = request.json
    certificado = session.query(Certificado).get(id)
    if not certificado:
        return jsonify({"error": "Certificado não encontrado"}), 404
    certificado.nome = data['nome']
    certificado.instituicao = data['instituicao']
    certificado.ano = data['ano']
    certificado.url = data.get('url')
    session.commit()
    return jsonify({"message": "Certificado atualizado com sucesso!"})

@app.route('/api/certificados/<int:id>', methods=['DELETE'])
def delete_certificado(id):
    certificado = session.query(Certificado).get(id)
    if not certificado:
        return jsonify({"error": "Certificado não encontrado"}), 404
    session.delete(certificado)
    session.commit()
    return jsonify({"message": "Certificado excluído com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)
