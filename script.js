// ============================================================
// AVALIAÇÃO SIPAT — nota (1-5) + dica pro próximo evento
// Sem coleta de nome/telefone: é feedback anônimo.
// ============================================================

let selectedRating = null;

// ============================================================
// ELEMENTOS
// ============================================================
const screens = {
  intro: document.getElementById("screen-intro"),
  avaliacao: document.getElementById("screen-avaliacao"),
  obrigado: document.getElementById("screen-obrigado"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => (s.hidden = true));
  screens[name].hidden = false;
}

// ============================================================
// FLUXO
// ============================================================
document.getElementById("btn-start").addEventListener("click", () => {
  showScreen("avaliacao");
});

const ratingGroup = document.getElementById("rating-group");
const submitBtn = document.getElementById("btn-submit");
const ratingHint = document.getElementById("rating-hint");

ratingGroup.addEventListener("click", (e) => {
  const chip = e.target.closest(".rating-chip");
  if (!chip) return;

  [...ratingGroup.children].forEach((c) => c.classList.remove("selected"));
  chip.classList.add("selected");
  selectedRating = Number(chip.dataset.value);

  submitBtn.disabled = false;
  ratingHint.classList.add("hidden");
});

document.getElementById("btn-submit").addEventListener("click", () => {
  if (!selectedRating) return;

  const tip = document.getElementById("tip-text").value.trim();

  saveFeedbackLocally({
    nota: selectedRating,
    dica: tip || "(sem dica)",
    horario: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
  });

  renderThanks(selectedRating);
  showScreen("obrigado");
});

function renderThanks(rating) {
  const messages = {
    1: { emoji: "🙏", text: "Valeu por avaliar com sinceridade. Sua dica vai direto pra correção do próximo SIPAT." },
    2: { emoji: "👍", text: "Recebido! Sua nota ajuda a apontar o que precisa melhorar de verdade." },
    3: { emoji: "✅", text: "Valeu! Toda dica ajuda a deixar o próximo SIPAT ainda mais redondo." },
    4: { emoji: "🙌", text: "Show! Fico feliz que valeu a pena — sua dica ainda ajuda a melhorar mais." },
    5: { emoji: "🎉", text: "Nota máxima! Obrigado por participar de verdade e por deixar sua dica." },
  };
  const { emoji, text } = messages[rating] || messages[3];
  document.getElementById("thanks-emoji").textContent = emoji;
  document.getElementById("thanks-message").textContent = text;
}

document.getElementById("btn-again").addEventListener("click", () => {
  selectedRating = null;
  [...ratingGroup.children].forEach((c) => c.classList.remove("selected"));
  document.getElementById("tip-text").value = "";
  submitBtn.disabled = true;
  ratingHint.classList.remove("hidden");
  showScreen("avaliacao");
});

// ============================================================
// ARMAZENAMENTO LOCAL (backup no próprio aparelho)
// Cada avaliação fica guardada aqui, mesmo sem internet no
// momento. O botão "›" no rodapé exporta tudo em um .csv.
// ============================================================
const LOCAL_STORAGE_KEY = "keizi_sipat_feedback";

function saveFeedbackLocally(record) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    existing.push(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Falha ao salvar avaliação localmente:", err);
  }
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadFeedbackCSV() {
  const records = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  if (records.length === 0) {
    alert("Ainda não há nenhuma avaliação salva neste aparelho.");
    return;
  }

  const headers = ["Nota", "Dica", "Horário"];
  const rows = records.map((r) => [r.nota, r.dica, r.horario]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(csvEscape).join(";"))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dataHoje = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `avaliacoes-sipat-keizi-${dataHoje}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("btn-download-leads").addEventListener("click", downloadFeedbackCSV);
