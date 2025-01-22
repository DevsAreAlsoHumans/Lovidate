# Lovidate

## Cahier des Charges - Application de Rencontre (MVP)

### 1. Description du projet
L'objectif de ce projet est de développer une application de rencontre permettant aux utilisateurs de swiper, matcher, et discuter avec d'autres personnes. L'objectif est de fournir une plateforme intuitive et fonctionnelle avec les fonctionnalités essentielles suivantes :

- Swipe pour indiquer un intérêt ou non.
- Système de match pour connecter les utilisateurs ayant un intérêt mutuel.
- Chat entre utilisateurs ayant matché.

### 2. Users Stories et Critères d'acceptation

#### 2.1 Swipe
**User Story 1** : En tant qu'utilisateur, je veux pouvoir swiper à gauche ou à droite sur des profils afin d'exprimer mon intérêt ou mon absence d'intérêt.

**Critères d'acceptation** :

- Chaque profil doit afficher les informations suivantes : photo, prénom, âge, localisation.
- Un bouton ou un geste doit permettre de swiper à gauche ("pass") ou à droite ("like").

#### 2.2 Match
**User Story 2** : En tant qu'utilisateur, je veux être informé lorsque j'ai un match avec un autre utilisateur.

**Critères d'acceptation** :

- Une notification doit apparaître lorsqu'un match est détecté.
- Les utilisateurs matchés doivent être affichés dans une section dédiée "Matches".

#### 2.3 Chat
**User Story 3** : En tant qu'utilisateur, je veux pouvoir discuter avec mes matchs afin de mieux les connaître.

**Critères d'acceptation** :

- Une interface de chat doit être disponible pour chaque match.
- Les utilisateurs doivent pouvoir envoyer et recevoir des messages en temps réel.
- Les messages doivent inclure le texte et l'heure d'envoi.

### 3. Architecture Technique

#### 3.1 Langages et Technologies
- **Backend** : PHP (REST API)
- **Frontend** : React.js et JavaScript
- **Base de données** : MySQL

#### 3.2 Base de données

**Table utilisateurs**
- id : Identifiant unique de l'utilisateur.
- prenom : Prénom de l'utilisateur.
- age : Âge de l'utilisateur.
- localisation : Localisation de l'utilisateur.
- photo : URL de la photo de profil.

**Table matchs**
- id : Identifiant unique du match.
- utilisateur_1_id : Référence au premier utilisateur.
- utilisateur_2_id : Référence au deuxième utilisateur.
- date_match : Date et heure du match.

**Table messages**
- id : Identifiant unique du message.
- match_id : Référence au match associé.
- utilisateur_id : Référence à l'expéditeur du message.
- contenu : Texte du message.
- date_envoi : Date et heure de l'envoi.

### 4. Commandes et environnement

Création d'un fichier `.env.local` dans le dossier backend puis le compléter :

```
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=
```

#### Lancement du backend

```bash
cd backend
composer install
php -S localhost:8000
```

#### Lancement du frontend

```bash
cd frontend
npm install
npm start
```

### 5. Livrables

- Application fonctionnelle avec toutes les fonctionnalités décrites.
- Documentation technique pour les développeurs (facultatif).
- Guide d'utilisation pour les utilisateurs finaux (facultatif).

