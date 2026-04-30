# Ecológica Verde - Links Page

Página de links da Ecológica Verde com atualização automática de seguidores.

## Estrutura

- `index.html` - Página principal
- `styles.css` - Estilos
- `script.js` - Lógica do frontend
- `followers.json` - Dados dos seguidores
- `update-followers.js` - Script de atualização
- `.github/workflows/update-followers.yml` - GitHub Actions

## Atualização Automática

O GitHub Actions executa `update-followers.js` a cada 30 minutos para atualizar a contagem de seguidores.