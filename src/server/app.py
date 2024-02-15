from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///utilisateurs.db'
app.config['JWT_SECRET_KEY'] = 'D@mien123456'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Durée de validité du jeton

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class Utilisateur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    identifiant = db.Column(db.String(50), unique=True, nullable=False)
    mot_de_passe = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(50))
    nom = db.Column(db.String(50))

def clear_database():
    with app.app_context():
        Utilisateur.query.delete()
        db.session.commit()

# connexion
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    user = Utilisateur.query.filter_by(identifiant=username).first()
    if user and bcrypt.check_password_hash(user.mot_de_passe, password):
        access_token = create_access_token(identity=user.id)  # Créez un token JWT avec l'identifiant de l'utilisateur
        return jsonify(message = "Vous êtes connecté, pas de fonctionnalités pour le moment !", access_token=access_token), 200
    else:
        return jsonify({'message': 'Identifiant/mot de passe incorrect'}), 401


@app.route('/add-user', methods=['POST'])
def add_user():
    identifiant = request.form.get('identifiant')
    mot_de_passe = request.form.get('mot_de_passe')
    nom = request.form.get('nom')
    prenom = request.form.get('prenom')

    hashed_password = bcrypt.generate_password_hash(mot_de_passe).decode('utf-8')

    new_user = Utilisateur(identifiant=identifiant, mot_de_passe=hashed_password, nom=nom, prenom=prenom)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Utilisateur ajouté avec succès ! Merci de retourner à l\'accueil.'})

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = Utilisateur.query.get(current_user_id)
    return jsonify(logged_in_as=user.identifiant), 200

with app.app_context():

    db.create_all()

    if not Utilisateur.query.first():
        hashed_password = bcrypt.generate_password_hash('@ttention123456').decode('utf-8')
        utilisateur_test = Utilisateur(identifiant='toto', mot_de_passe=hashed_password, prenom='Toto', nom='Tutu')
        db.session.add(utilisateur_test)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
    #clear_database()
