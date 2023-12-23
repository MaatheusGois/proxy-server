const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Desativar o CORS (não use isso em produção sem considerar as implicações de segurança)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rota para encaminhar solicitações com a URL como parâmetro
app.get('/api/proxy', async (req, res) => {
  try {
    // Obter a URL de destino do parâmetro da solicitação
    const targetUrl = req.query.url;

    if (!targetUrl) {
      return res.status(400).json({ error: 'Parâmetro "url" ausente na solicitação.' });
    }

    // Fazer solicitação à URL de destino
    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao encaminhar a solicitação:', error.message);
    res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
