// baterPonto.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Função para formatar 1 em 01
const zeroFill = n => {
    return ('0' + n).slice(-2);
}

// Função para obter a data no formato dd/mm/aaaa
const obterDataFormatada = () => {
    const now = new Date();
    const dia = zeroFill(now.getDate());
    const mes = zeroFill(now.getMonth() + 1);
    const ano = now.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para bater ponto
const baterPonto = () => {
    const dataFormatada = obterDataFormatada();
    const horario = new Date().toLocaleTimeString();

    const registro = `Data: ${dataFormatada}, Hora: ${horario}\n`;

    // Salvar o registro em um arquivo
    fs.appendFile('pontos.txt', registro, (err) => {
        if (err) {
            console.error('Erro ao salvar o registro:', err);
        } else {
            console.log('Registro salvo com sucesso!');
        }
    });
}

// Rota para bater ponto
app.get('/baterponto', (req, res) => {
    baterPonto();
    res.send('Ponto batido com sucesso!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});