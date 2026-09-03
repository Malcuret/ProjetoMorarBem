require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Lead, sequelize } = require('./models');
const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173').split(',').map((origin) => origin.trim());
const image = (id) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1200&q=80';
const imoveis = [
  { codigo: 'MB-001', titulo: 'Casa com quintal no Jardim das Flores', preco: 485000, tipo: 'Casa', quartos: 3, banheiros: 2, area: 118, localizacao: 'Jardim das Flores, Sao Paulo', descricao: 'Casa arejada com sala integrada, quintal e duas vagas.', imagens: [image('photo-1600585154340-be6161a56a0c'), image('photo-1600566753086-00f18fb6b3ea'), image('photo-1600607687939-ce8a6c25118c')] },
  { codigo: 'MB-002', titulo: 'Apartamento proximo ao centro', preco: 365000, tipo: 'Apartamento', quartos: 2, banheiros: 1, area: 64, localizacao: 'Centro, Sao Paulo', descricao: 'Apartamento iluminado com ambientes confortaveis.', imagens: [image('photo-1522708323590-d24dbb6b0267'), image('photo-1560185007-cde436f6a4d0'), image('photo-1560448204-e02f11c3d0e2')] },
  { codigo: 'MB-003', titulo: 'Casa moderna em condominio', preco: 790000, tipo: 'Casa', quartos: 4, banheiros: 3, area: 180, localizacao: 'Vila Verde, Campinas', descricao: 'Casa moderna em condominio com espaco gourmet.', imagens: [image('photo-1600047509807-ba8f99d2cdde'), image('photo-1600210492486-724fe5c67fb0'), image('photo-1600607687920-4e2a09cf159d')] },
  { codigo: 'MB-004', titulo: 'Apartamento com varanda', preco: 520000, tipo: 'Apartamento', quartos: 3, banheiros: 2, area: 86, localizacao: 'Moema, Sao Paulo', descricao: 'Apartamento com varanda e excelente iluminacao natural.', imagens: [image('photo-1545324418-cc1a3fa10c00'), image('photo-1505693416388-ac5ce068fe85'), image('photo-1494526585095-c41746248156')] },
  { codigo: 'MB-005', titulo: 'Sobrado familiar com jardim', preco: 640000, tipo: 'Casa', quartos: 3, banheiros: 3, area: 145, localizacao: 'Alto da Lapa, Sao Paulo', descricao: 'Sobrado familiar com jardim, escritorio e garagem.', imagens: [image('photo-1605276374104-dee2a0ed3cd6'), image('photo-1600585152913-8c4c5c5c5c5c'), image('photo-1600566753190-17f0baa2a6c3')] },
  { codigo: 'MB-006', titulo: 'Studio funcional perto do metro', preco: 295000, tipo: 'Apartamento', quartos: 1, banheiros: 1, area: 38, localizacao: 'Pinheiros, Sao Paulo', descricao: 'Studio funcional e bem localizado, ideal para investimento.', imagens: [image('photo-1536376072261-38c75010e6c9'), image('photo-1567767292278-a4f21aa2d36e'), image('photo-1554995207-c18c203602cb')] }
];
app.use(cors({ origin(origin, callback) { return !origin || allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Origin not allowed.')); } }));
app.use(express.json());
app.get('/', (req, res) => res.json({ status: 'OK' }));
app.get('/api/imoveis', (req, res) => res.json(imoveis));
app.get('/api/imoveis/:codigo', (req, res) => { const imovel = imoveis.find((item) => item.codigo === req.params.codigo); return imovel ? res.json(imovel) : res.status(404).json({ error: 'Imovel nao encontrado.' }); });
app.post('/api/leads', async (req, res) => { try { const codigo = String(req.body.codigo_imovel || '').trim(); const telefone = String(req.body.telefone || '').replace(/\D/g, ''); if (!imoveis.some((imovel) => imovel.codigo === codigo)) return res.status(400).json({ error: 'Código de imóvel inválido.' }); if (!/^[1-9]\d{9,10}$/.test(telefone)) return res.status(400).json({ error: 'Informe um telefone válido com DDD.' }); const lead = await Lead.create({ codigo_imovel: codigo, telefone }); return res.status(201).json({ message: 'Interesse enviado com sucesso!', lead: { id: lead.id, codigo_imovel: lead.codigo_imovel, telefone: lead.telefone } }); } catch (error) { console.error(error); return res.status(500).json({ error: 'Nao foi possivel salvar o interesse.' }); } });
const PORT = process.env.PORT || 3001;
async function startServer() { if (process.env.DATABASE_URL) { try { await sequelize.authenticate(); } catch (error) { console.error('Erro ao conectar ao banco:', error.message); } } else { console.warn('DATABASE_URL nao foi definida; o catalogo continua disponivel, mas leads nao serao salvos.'); } app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT)); }
startServer();
