# 🧩 Todo API — Backend en Node.js / Express / MongoDB

Une API RESTful de gestion de tâches (Todo) construite avec **Node.js**, **Express**, et **MongoDB (Mongoose)**.  
Projet d'apprentissage backend — routes CRUD complètes, recherche, pagination, validation, sécurité, et seed automatique.

---

## 🚀 Installation

Clone le projet :
```bash
git clone https://github.com/Zeiyar/ToDoList-But-with-backend.git
cd ToDoList-But-with-backend
npm install

▶️ Lancer le serveur
En mode développement :
node server.js start

Remplir la base avec des données :
node seed.js fill

Vider la base :
node seed.js clear


Le serveur démarre sur :
👉 https://todolist-but-with-backend.onrender.com

📚 Endpoints
Méthode	Route	Description
GET	/todos	Liste toutes les tâches
POST	/todos/add	Ajoute une nouvelle tâche
PUT	/todos/modify/:id	Marque une tâche comme faite / à refaire
DELETE	/todos/delete/:id	Supprime une tâche
GET	/todos/search?term=learn&page=1&limit=5&sort=category	Recherche + pagination + tri

Sécurité & Middlewares
Middleware	Rôle
helmet	Ajoute des headers HTTP sécurisés
cors	Autorise les requêtes externes (ex: frontend React)
morgan	Logger HTTP en mode dev/prod
express.json()	Parse les corps JSON des requêtes
ErrorHandler	Gère les erreurs globales serveur
Joi	Validation des entrées utilisateur

🧠 Scripts utiles
Script	Action
node server.js	Lance le serveur
node seed.js fill	Remplit la base avec des données
node seed.js clear	Vide la base
npm test	Lance les tests Jest
