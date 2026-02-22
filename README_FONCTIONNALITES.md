# My Girly Pokedex - Documentation Complète

**Démo vidéo :** https://www.youtube.com/watch?v=3jU1osUDEFw

## 📋 Instructions de Base (Demandes du Prof)

### Partie BACKEND ✅

**CRUD Complet :**
- `GET /pokemons?page=1` - Récupère 20 pokémons avec pagination
- `GET /pokemons/search?name=pikachu` - Recherche un pokémon par nom
- `POST /pokemons` - Crée un nouveau pokémon
- `PUT /pokemons/:id` - Modifie les infos d'un pokémon
- `DELETE /pokemons/:id` - Supprime un pokémon de la base

### Partie FRONTEND ✅

**Pages et Fonctionnalités :**
- **Liste des pokémons** : Affichage en grille avec pagination (20 par page)
- **Carte pokémon cliquable** : Récupère les infos et affiche page détails
- **Page détails** : Modifier certaines infos du pokémon
- **Suppression** : Bouton supprime avec modale d'avertissement
- **Ajouter pokémon** : Formulaire pour créer un nouveau pokémon

---

## 🎁 Fonctionnalités Supplémentaires (Au-Delà des Demandes)

### 1️⃣ 🎮 Memory Game - Mini-Jeu Interactif
- Jeu de mémoire avec 16 cartes (8 pokémons aléatoires x2)
- Animations flip 3D fluides avec perspective
- Suivi des mouvements et statistiques
- Message de victoire avec score final

### 2️⃣ ⚖️ Comparaison de Pokémons
- Sélectionner jusqu'à 2 pokémons via checkboxes
- Modal côte-à-côte avec 3 colonnes (Pokémon 1 | Stats | Pokémon 2)
- Visualisation de 6 stats : HP, Attack, Defense, SpAtk, SpDef, Speed
- Barres de progression + total stats calculé automatiquement

### 3️⃣ 🔍 Recherche Avancée
- Recherche par nom du pokémon
- Filtrage par type (18 types disponibles)
- Combinaison des deux critères pour affinage

### 4️⃣ 🎨 Design Girly Complet
- **Palette** : Turquoise (#00D9FF), Rose (#FF69B4), gradients pastel
- **Typographies** : Fredoka (corps), Comfortaa (titres), Press Start 2P (stats)
- **Effets** : Coins asymétriques, bordures dégradées, animations fluides
- **Favicon** : Pokéball emoji

### 5️⃣ 🔧 CustomSelect Réutilisable
- Composant dropdown personnalisé
- Style cohérent avec design girly
- Animation flèche + scrollbar customisée
- Utilisé partout (types, recherche, filtrage)

---

## 🛠 Stack Technique

| Partie | Technologie | Details |
|---|---|---|
| **Frontend** | React 19 + Vite 7 + React Router 7 | Port 5173, hot reload |
| **Backend** | Express.js | Port 3000, CORS activé |
| **Data** | JSON persistence (pokemons.json) | Stockage fichier |
| **Optional DB** | MongoDB 8.0 | Setup prêt pour expansion |

---

## 🚀 Installation & Lancement

```bash
# Frontend (port 5173)
cd tp-front-Pyxina
npm install && npm run dev

# Backend (port 3000) - Terminal différent
cd tp-back-final-Pyxina
npm install && npm start

# MongoDB (optionnel)
brew services start mongodb-community@8.0
```

Accédez à : **http://localhost:5173**

---

## 📊 Résumé

| Catégorie | Statut |
|---|---|
| ✅ Instructions du prof | **Complètes** |
| ✅ Features bonus | **5 extras** (Memory, Comparaison, Recherche avancée, Design, CustomSelect) |
| ✅ Responsive | **100%** |
| ✅ Performance | **Vite optimisé** |

---

**Créé avec 💗 et beaucoup de rose ! ✨**
