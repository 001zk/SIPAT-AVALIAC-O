# Avaliação SIPAT 📋

**Devolutiva rápida do evento — SIPAT × KEIZI × Estácio Campos**

Surgiu de uma pergunta direta: como saber se a SIPAT realmente funcionou, sem depender de formulário chato ou planilha que ninguém preenche? A resposta foi transformar a devolutiva em algo do tamanho de um celular passando de mão em mão — nota de 1 a 5 e uma dica pro próximo ano, em menos de 1 minuto.

Antes da nota, uma tela curta explica por que a SIPAT existe (ela é prevista na NR-5) e por que aquela avaliação importa — pra quem participa não sentir que tá só "cumprindo tabela".

## 🖊️ Como funciona pra quem responde

1. Lê rapidamente por que a SIPAT importa
2. Escolhe uma nota de 1 a 5 (chips clicáveis, sem digitar nada)
3. Deixa uma dica ou ideia pro próximo evento (campo de texto livre, opcional)
4. Recebe uma mensagem de agradecimento — e o celular já passa pra próxima pessoa

## ⚙️ Como funciona por baixo do capô

Sem framework, sem backend, sem servidor pra configurar — só HTML, CSS e JS puro, publicado direto no GitHub Pages.

- **Feedback anônimo** — diferente do quiz de cenas, aqui não se pede nome nem telefone. Só nota e dica.
- **Salvo no próprio aparelho** (`localStorage`) — cada avaliação fica guardada ali, offline inclusive, até alguém exportar.
- **Botão de exportar bem escondido** — o mesmo `›` discreto no canto da tela, que baixa tudo em `.csv` quando o evento acabar.

## 📁 Estrutura

```
/index.html      → as 3 telas (intro, avaliação, agradecimento)
/style.css        → visual (mesma identidade da faixa de interdição preto/amarelo)
/script.js        → lógica: seleção de nota, salvamento local, CSV
/images/          → logo da KEIZI
```

## 🚀 Rodando local

Não precisa de nada além de um navegador — só abrir o `index.html`. Pra testar igual ao ambiente publicado (evita gambiarra de cache/CORS), sobe um servidor local rápido:

```
npx serve .
```

## 🔒 Sobre os dados

Cada avaliação some junto com o histórico do navegador se ninguém exportar antes. Por isso: no fim do evento, aperta o botãozinho discreto no canto e salva o `.csv` antes de fechar a aba. O arquivo vem com três colunas: `Nota`, `Dica` e `Horário` — nada de dado pessoal.

---

SIPAT × KEIZI × Estácio Campos
