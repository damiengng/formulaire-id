from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///utilisateurs.db'
db = SQLAlchemy(app)

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

    user = Utilisateur.query.filter_by(identifiant=username, mot_de_passe=password).first()
    if user:
        return jsonify({'message': 'Vous êtes connecté, pas de fonctionnalités pour le moment !'})
    else:
        return jsonify({'message': 'Identifiant/mot de passe incorrect'})


@app.route('/add-user', methods=['POST'])
def add_user():
    identifiant = request.form.get('identifiant')
    mot_de_passe = request.form.get('mot_de_passe')
    nom = request.form.get('nom')
    prenom = request.form.get('prenom')

    new_user = Utilisateur(identifiant=identifiant, mot_de_passe=mot_de_passe, nom=nom, prenom=prenom)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Utilisateur ajouté avec succès !'})


with app.app_context():

    db.create_all()

    if not Utilisateur.query.first():
        utilisateur_test = Utilisateur(identifiant='toto', mot_de_passe='@ttention123456', prenom='Toto', nom='Tutu')
        db.session.add(utilisateur_test)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
    #clear_database()