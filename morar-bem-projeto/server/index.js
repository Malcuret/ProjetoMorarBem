require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Lead, sequelize } = require('./models'); // Exemplo assumindo uso do Sequelize

const app = express();

app.use(cors());
app.use(express.json());

// Rota de verificação de saúde da API
app.get('/', (req, res) => {
  return res.status(200).json({ status: 'OK', message: 'API Imobiliária Morar Bem Rodando!' });
});

// Rota para capturar leads do formulário
app.post('/api/leads', async (req, res) => {
  try {
    const { codigo_imovel, telefone } = req.body;

    // Validação de campos obrigatórios
    if (!codigo_imovel || !telefone) {
      return res.status(400).json({ error: 'Código do imóvel e telefone são obrigatórios.' });
    }

    // Limpeza rápida do telefone (remove tudo que não for dígito)
    const telefoneLimpo = String(telefone).replace(/\D/g, '');

    if (telefoneLimpo.length < 10) {
      return res.status(400).json({ error: 'Número de telefone inválido.' });
    }

    const novoLead = await Lead.create({ 
      codigo_imovel: String(codigo_imovel).trim(), 
      telefone: telefoneLimpo 
    });

    return res.status(201).json({ 
      message: 'Lead cadastrado com sucesso!', 
      lead: novoLead 
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar o lead.' });
  }
});

const PORT = process.env.PORT || 3001;

// Inicialização segura do servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  
  // Opcional: Testa conexão com o banco ao ligar o servidor (se usar Sequelize)
  if (sequelize) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o banco de dados estabelecida.');
    } catch (dbError) {
      console.error('❌ Erro ao conectar ao banco de dados:', dbError);
    }
  }
});