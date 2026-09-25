# 🐾 Petshop Management System

Um sistema de gerenciamento para petshop moderno e funcional, desenvolvido com **Node.js**, **Express** e **MySQL**. O projeto conta com uma interface web para login e painéis interativos de cadastro e controle de **pets** e **veterinários**, além de suporte para execução via **Docker Compose**.

---

## 📸 Telas da Aplicação

A interface web está organizada nas seguintes páginas:

- 🔑 **`index.html`**: Tela de Login / Autenticação.
- 📊 **`dashbord.html`**: Painel principal de controle.
- 🐶 **`pets.html`**: Gerenciamento e cadastro de pets.
- 👨‍⚕️ **`vets.html`**: Gerenciamento e cadastro de veterinários.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3 (`style.css`), JavaScript puro
- **Back-end:** Node.js, Express v5, CORS
- **Banco de Dados:** MySQL (driver `mysql2`)
- **Containerização:** Docker e Docker Compose

---

## 📂 Estrutura do Projeto

```text
petshop-system/
├── public/
│   ├── index.html       # Tela de login
│   ├── dashbord.html    # Painel principal
│   ├── pets.html        # Gestão de pets
│   ├── vets.html        # Gestão de veterinários
│   └── style.css        # Estilos da interface
├── .gitignore
├── docker-compose.yml   # Container do MySQL/Aplicação
├── package.json
├── package-lock.json
└── server.js            # Servidor Express e rotas da API
