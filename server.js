const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Railway donne un port automatiquement
const PORT = process.env.PORT || 3000;

// servir les fichiers du site
app.use(express.static(__dirname));

// route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log("New Contact Message");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.send("Message received successfully!");

});

// démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});