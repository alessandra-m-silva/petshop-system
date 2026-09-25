const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin', 
    password: '1234',
    database: 'login',
    port: 3306
});

app.post('/petshop/login', async (req, res) => {
    const { user, email, senha } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length == 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        const usuario = rows[0];

        if (usuario.senha != senha) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        } 

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                email: usuario.email,
                user: usuario.user
            }
        }); 

    } catch (error) {
        console.error('Erro no banco de dados:', error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.post('/petshop/cadastrar-pet', async (req, res) => {
    const {tutor, pet, raca, genero, peso, idade} = req.body;

    if (!tutor || !pet || !raca || !genero || !peso || !idade) {
        return res.status(400).json({message:'Todos os campos são obrigatórios.'});
    }

    try {
        const query = `
            INSERT INTO pets (tutor, pet, raca, genero, peso, idade)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.query(query, [tutor, pet, raca, genero, peso, idade]);
        return res.status(201).json({message: 'Pet cadastrado com sucesso!'})
        
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao salvar no banco de dados.'})
    }
});
app.post('/petshop/cadastrar-vet', async (req, res) => {
    const {nome, crmv, especialidade} = req.body;

    if(!nome || !crmv || !especialidade) {
        return res.status(400).json({message: 'Todos os campos são obrigatórios.'})
    }

    try {
        const query = `
            INSERT INTO veterinarios (nome, crmv, especialidade)
            VALUES (?, ?, ?)
        `;

        await db.query(query, [nome, crmv, especialidade]);
        return res.status(201).json({message: 'Veterinário cadastrado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message: 'Erro ao salvar no banco de dados.'})
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
 
process.on('uncaughtException', (err) => {
    console.error('O SERVIDOR CAIU PELO SEGUINTE ERRO:', err);
});