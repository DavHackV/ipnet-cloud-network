const express = require('express');
const path = require('path');

const app = express();

// Railway donne un port automatiquement
const PORT = process.env.PORT || 3000;

// servir les fichiers du site
app.use(express.static(__dirname));

// route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});