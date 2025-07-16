import * as vars from "./vars.js";

/**
 * Обчислює оцінку надійності пароля за його довжиною.
 * Визначає, в який діапазон довжини потрапляє пароль і повертає відповідний бал.
 *
 * @returns {number} Бал оцінки довжини пароля від 0 до 4.
 */
function calculateLengthScore() {
  const lengthValue = Number(vars.rangeLengthValue.textContent);
  const lengthScoring = [
    { passwordSize: [6, 7], score: 0 },
    { passwordSize: [8, 10], score: 1 },
    { passwordSize: [11, 14], score: 2 },
    { passwordSize: [15, 17], score: 3 },
    { passwordSize: [18, 20], score: 4 },
  ];

  const lengthItem = lengthScoring.find(({ passwordSize }) => {
    const [min, max] = passwordSize;
    return lengthValue >= min && lengthValue <= max;
  });

  return lengthItem ? lengthItem.score : 0;
}
/**
 * Обчислює сумарний бал за вибраними опціями пароля.
 * Для кожної опції, якщо вона увімкнена (checkbox.checked), додає відповідний бал.
 *
 * @returns {number} Загальний бал опцій пароля.
 */
function calculateOptionsScore() {
  const checkedInputScores = {
    lowerCase: 1,
    upperCase: 1,
    numbers: 1,
    symbols: 2,
    similar: -1,
  };

  const optionNames = [
    "lowerCase",
    "upperCase",
    "numbers",
    "symbols",
    "similar",
  ];
  let totalScore = 0;

  vars.passwordOptions.forEach((checkbox, index) => {
    const optionName = optionNames[index];

    if (checkbox.checked) {
      totalScore += checkedInputScores[optionName];
    }
  });

  return totalScore;
}
/**
 * Перевіряє, чи жодна з опцій для генерації пароля не вибрана.
 *
 * Перетворює список чекбоксів `passwordOptions` у масив і перевіряє,
 * що всі чекбокси неактивні (не обрані).
 *
 * @returns {boolean} Повертає `true`, якщо жодна опція не вибрана, інакше `false`.
 */
function isPasswordOptionEmpty() {
  return [...vars.passwordOptions].every((checkbox) => !checkbox.checked);
}
/**
 * Оновлює індикатор надійності пароля.
 * Якщо жодна опція не вибрана, очищує значення пароля і скидає індикатор.
 * Інакше обчислює сумарний бал опцій та довжини пароля,
 * визначає рівень надійності та оновлює відповідний текст і стиль.
 *
 * @returns {void} Функція не повертає значення.
 */
function updateStrengthIndicator() {
  if (isPasswordOptionEmpty()) {
    vars.strengthBox.setAttribute("class", "");
    vars.strengthText.textContent = "";
    return;
  }

  const optionScore = calculateOptionsScore();

  const lengthScore = calculateLengthScore();
  const assessment = optionScore + lengthScore;

  const strengthValue = [
    { min: 0, max: 3, label: "TOO-WEAK!", className: "tooWeak" },
    { min: 3, max: 5, label: "WEAK", className: "weak" },
    { min: 5, max: 8, label: "MEDIUM", className: "medium" },
    { min: 8, max: Infinity, label: "STRONG", className: "strong" },
  ];

  const score = strengthValue.find(
    ({ min, max }) => assessment >= min && assessment < max
  );

  if (score) {
    vars.strengthBox.setAttribute("class", score.className);
    vars.strengthText.textContent = score.label;
  }
}
/**
 * Генерує пароль на основі вибраних опцій користувача.
 * Вибирає символи з наборів, відповідно до вибраних чекбоксів,
 * та формує рядок довжиною, заданою у `rangeLengthValue`.
 * Результат записується у поле `passwordValue`.
 *
 * @returns {void} Функція не повертає значення.
 */
function generatePassword() {
  vars.passwordValue.style.color = "#e6e5ea";
  let generatedPassword = "";
  const selectedChars = [];

  const optionName = [
    "upperCase",
    "lowerCase",
    "numbers",
    "symbols",
    "similar",
  ];

  const selectedOptions = [...vars.passwordOptions].reduce(
    (acc, checkbox, index) => {
      acc[optionName[index]] = checkbox.checked;
      return acc;
    },
    {}
  );

  const list = {
    upperCase: vars.letterUpperCase,
    lowerCase: vars.letterLowerCase,
    numbers: vars.numbers,
    symbols: vars.symbols,
    similar: vars.similar,
  };

  for (const item in list) {
    if (selectedOptions[item]) {
      selectedChars.push(...list[item]);
    }
  }

  for (let i = 1; i <= Number(vars.rangeLengthValue.textContent); i++) {
    const randomNumber = Math.floor(Math.random() * selectedChars.length);
    generatedPassword += selectedChars[randomNumber];
  }

  if (isPasswordOptionEmpty()) {
    vars.passwordValue.value = "";
    return;
  }

  vars.passwordValue.value = generatedPassword;
}
/**
 * Копіює згенерований пароль у буфер обміну.
 * Якщо пароль порожній, нічого не робить.
 * Після успішного копіювання відображає повідомлення "copy" на 3 секунди.
 * У разі помилки виводить повідомлення в консоль.
 *
 * @returns {void} Функція не повертає значення.
 */
function copyPassword() {
  const password = vars.passwordValue.value;

  if (!password) return;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      vars.copyMessage.setAttribute("style", "display: block");
      vars.passwordValue.setAttribute("style", "color: darkgray");
      setTimeout(() => {
        vars.copyMessage.setAttribute("style", "display: none");
      }, 1000);
    })
    .catch((err) => {
      console.error("Не вдалося скопіювати пароль:", err);
    });
}
/**
 * Обробник події input для елемента вибору довжини пароля.
 * Оновлює відображення поточного значення довжини,
 * а також викликає функції для підрахунку балу довжини
 * та оновлення індикатора сили пароля.
 *
 * @param {InputEvent} e Об'єкт події input.
 * @returns {void}
 */
vars.rangeLength.addEventListener("input", (e) => {
  const currentLength = e.target.value;
  vars.rangeLengthValue.textContent = currentLength;

  calculateLengthScore();
  updateStrengthIndicator();
});
/**
 * Додає обробники події 'input' до кожного чекбоксу в масиві passwordOptions.
 * При зміні будь-якого чекбокса перераховує бали опцій і оновлює індикатор сили пароля.
 */
for (const item of vars.passwordOptions) {
  item.addEventListener("input", () => {
    calculateOptionsScore();
    updateStrengthIndicator();
  });
}
/**
 * Викликає генерацію пароля при завантаженні скрипта.
 */

/**
 * Додає обробник кліку на кнопку генерації пароля.
 * При натисканні генерує новий пароль.
 */
vars.generateBtn.addEventListener("click", () => {
  generatePassword();
});
/**
 * Додає обробник кліку на кнопку копіювання пароля.
 * При натисканні копіює поточний пароль у буфер обміну.
 */
vars.copyBtn.addEventListener("click", copyPassword);
