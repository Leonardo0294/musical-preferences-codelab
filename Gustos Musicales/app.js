import { getTopKRecommendations } from "./rc.js";

const form = document.querySelector("form");
const output = document.querySelector("#recommendations");

const bands = [
  "Soda Stereo",
  "Café Tacvba",
  "Héroes del Silencio",
  "Maná",
  "Los Fabulosos Cadillacs",
  "Molotov",
  "La Ley",
  "Enanitos Verdes",
  "Caifanes",
  "Los Prisioneros",
];

const features = [
  "Rock",
  "Metal",
  "Pop",
  "Hard Rock",
  "Grunge",
  "Psicodélico",
  "Alternativo",
  "Indie",
  "Clásico",
];

const band_feats = [
  [5, 0, 4, 0, 0, 0, 0, 0, 3],
  [4, 0, 0, 5, 0, 0, 0, 0, 3],
  [4, 0, 0, 0, 0, 5, 0, 0, 3],
  [5, 0, 4, 4, 0, 0, 0, 0, 4],
  [5, 0, 0, 4, 0, 0, 0, 0, 4],
  [5, 0, 4, 4, 5, 0, 4, 0, 0],
  [5, 0, 0, 4, 0, 5, 0, 0, 4],
  [5, 0, 4, 0, 0, 0, 4, 4, 0],
  [5, 3, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 4, 0, 0, 0, 0, 0, 4],
];

document.addEventListener("DOMContentLoaded", () => {
  for (const band of bands) {
    const div = document.createElement("div");
    div.classList.add("band");
    div.innerHTML = `
      <h6>${band}</h6>
      <div class="d-flex gap-3">
        ${new Array(features.length)
          .fill()
          .map((_, index) => {
            return `
              <div class="form-check">
                <input class="form-check-input" type="radio" data-value="${
                  index + 1
                }" name="${band}" id="${band}-${index + 1}">
                <label class="form-check-label" for="${band}-${index + 1}">
                  ${index + 1}
                </label>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
    form.appendChild(div);
  }

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "w-100");
  submitButton.textContent = "Enviar";
  form.appendChild(submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const user_votes = getUserVotes();
    const [{ recommendations }] = getTopKRecommendations(
      user_votes,
      band_feats,
      features.length,
      features
    );
    renderRecommendations(recommendations);
  });
});

function renderRecommendations(recommendations) {
  output.innerHTML = ""; // Limpiar recomendaciones anteriores
  const div = document.createElement("ol");
  div.classList.add("recommendations");
  const categories = ["gold", "silver", "bronze"];
  recommendations.forEach((recommendation, index) => {
    const className = categories[index] ?? "bg-info-subtle";
    const li = document.createElement("li");
    li.classList.add("recommendation", className, "d-flex", "justify-content-start", "align-items-center", "gap-2");
    li.innerHTML = `
      <p>${index + 1}</p>
      <div class="d-flex w-100 justify-content-between align-items-center">
        <p>${recommendation.feature}</p>
        <p>${recommendation.value}</p>
      </div>
    `;
    div.appendChild(li);
  });
  output.appendChild(div);
}

function getUserVotes() {
  const user_votes = [];
  for (const band of bands) {
    const radios = document.querySelectorAll(`input[name="${band}"]:checked`);
    if (radios.length > 0) {
      const value = parseInt(radios[0].getAttribute("data-value"));
      user_votes.push(value);
    } else {
      user_votes.push(0); // Si no se ha seleccionado ningún botón de radio, asignar 0 como voto predeterminado
    }
  }
  return user_votes;
}
