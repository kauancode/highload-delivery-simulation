# Testes de Carga com Artillery

Este projeto foi validado com **testes de carga utilizando [Artillery](https://www.artillery.io/)**, comprovando não apenas a funcionalidade da aplicação, mas também sua **capacidade de escalar sob diferentes cenários de uso**.

---

## Resumo dos Resultados

- ✅ **0 falhas em 5.400 requisições** → *100% sucesso*  
- 🚀 Estabilidade comprovada até **~70 req/s**, com **latências médias <30ms**  
- ⚠️ Em cenários de **estresse extremo**:  
  - Latência média: **~3,9s**  
  - **p95**: >4s  
  - Usuários experimentaram **esperas excessivas**

---

## Conclusões

- O sistema é **confiável sob cargas leves e médias**  
- O **ponto de saturação** atual está em **~70 req/s**  
- Para cargas mais altas, são necessárias **otimizações para manter a baixa latência**

---

## Próximos Passos & Melhorias

- Definir **SLOs claros** (ex.: p95 < 200ms até 100 req/s)  
- Monitorar métricas críticas durante os testes: **CPU, memória, conexões de banco**  
- Otimizar: **queries SQL, índices, uso de cache**  
- Implementar observabilidade contínua em cenários de carga  

---

## ⚠️ Possíveis Gargalos Identificados

Durante o estresse, a degradação na latência pode estar relacionada a:

- **Banco de dados sobrecarregado** (queries lentas, falta de índices, limite de conexões)  
- **I/O bloqueante** (chamadas externas ou locks internos)  
- **Limitação de recursos** (CPU/memória saturados sob concorrência alta)  
- **Crescimento de filas internas** sem escoamento na mesma velocidade  

*Recomendação:* monitorar esses pontos em futuros experimentos para validação.

---

## Como Reproduzir os Testes

### 1. Instalar o Artillery
```bash
npm install -g artillery
```

### 2. Configurar o Cenário (`test.yml`)
Definir:  
- **Fases** → aquecimento, escalada, estresse  
- **Usuários virtuais**  
- **Endpoints** a serem testados  

### 3. Executar o Teste
```bash
artillery run test.yml
```

---

## 📊 Visualização da Latência

- Até **70 req/s** → Latência estável (~10ms)  
- Acima de **70 req/s** → Crescimento rápido (p95 > 1000ms)  
- Pico em **~80 req/s** → Latência média > 3s  
