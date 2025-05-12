// Toggle dropdown menu
const appleBtn = document.getElementById('appleBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

appleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', () => dropdownMenu.classList.remove('show'));
dropdownMenu.addEventListener('click', (e) => e.stopPropagation());

function toggleSubModels(seriesElement) {
  const subModels = seriesElement.nextElementSibling;
  const icon = seriesElement.querySelector("i.fas");

  document.querySelectorAll(".sub-models").forEach(sm => sm.style.display = sm === subModels && sm.style.display !== "block" ? "block" : "none");
  document.querySelectorAll(".series i.fas").forEach(i => i.className = i === icon && subModels.style.display === "block" ? "fas fa-chevron-up" : "fas fa-chevron-down");
}

function toggleDetails(modelElement) {
  const details = modelElement.nextElementSibling;
  const icon = modelElement.querySelector("i.fas");

  modelElement.parentElement.querySelectorAll(".details").forEach(d => d.style.display = d === details && d.style.display !== "block" ? "block" : "none");
  modelElement.parentElement.querySelectorAll(".model i.fas").forEach(i => i.className = i === icon && details.style.display === "block" ? "fas fa-chevron-up" : "fas fa-chevron-down");
}

function filterByCategory(category) {
  const sections = {
    tradein: document.getElementById('tradein'),
    airpods: document.getElementById('airpods'),
    och: document.getElementById('oplatabank'),
    iphone_check: document.getElementById('iphone_check'),
    pencil: document.getElementById('pencil')
  };

  Object.keys(sections).forEach(key => sections[key].style.display = key === category ? '' : 'none');

  if (category === 'tradein') {
    document.querySelectorAll('.series').forEach(series => {
      const isVisible = ['tradein', 'iphone'].includes(series.dataset.category);
      series.style.display = isVisible ? 'flex' : 'none';
      if (!isVisible) series.nextElementSibling.style.display = 'none';
    });
  }

  dropdownMenu.classList.remove('show');
}

window.onload = () => filterByCategory('tradein');

function calculate(inputId, buttonSelector, formulaId, resultId, percentages) {
  const input = parseFloat(document.getElementById(inputId).value);
  const selectedButton = document.querySelector(`${buttonSelector}.active`);
  const months = selectedButton ? parseFloat(selectedButton.dataset.months) : 0;

  if (!selectedButton || isNaN(input) || months <= 0) return;

  const percentage = percentages[months] || 0;
  const total = input + (input * (percentage / 100));
  document.getElementById(formulaId).textContent = `Вартість по 1С: ${total.toFixed(2)} ₴`;
  document.getElementById(resultId).textContent = `В місяць по: ${(total / months).toFixed(2)} ₴`;
}

document.addEventListener("DOMContentLoaded", () => {
  const configs = [
    { inputId: "inputX", buttonSelector: '.button-group button[data-months]', formulaId: "formula1", resultId: "result1", percentages: { 3: 3.1, 6: 8, 10: 13.7, 12: 16.9, 15: 21.6, 18: 26.5 } },
    { inputId: "inputY", buttonSelector: '.button-group button[data-months2]', formulaId: "formula2", resultId: "result2", percentages: { 3: 1.8, 6: 7.7, 10: 15.6, 12: 16.6, 15: 21.6, 18: 26.6 } },
    { inputId: "inputZ", buttonSelector: '.button-group button[data-months3]', formulaId: "formula3", resultId: "result3", percentages: { 3: 3.3, 6: 7.5, 10: 12.0, 12: 14.3, 15: 17.7, 18: 21.0 } }
  ];

  configs.forEach(({ inputId, buttonSelector, formulaId, resultId, percentages }) => {
    document.getElementById(inputId).addEventListener("input", () => calculate(inputId, buttonSelector, formulaId, resultId, percentages));
    document.querySelectorAll(buttonSelector).forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(buttonSelector).forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        calculate(inputId, buttonSelector, formulaId, resultId, percentages);
      });
    });
  });
});
