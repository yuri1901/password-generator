/**
 * Поле для відображення пароля.
 * @type {HTMLElement|null}
 */
export const passwordValue = document.querySelector("#password");
/**
 * Поле для відображення довжини пароля.
 * @type {HTMLElement|null}
 */
export const rangeLengthValue = document.querySelector("#lengthValue");
/**
 * Поле для зміни довжини пароля.
 * @type {HTMLElement|null}
 */
export const rangeLength = document.querySelector("#length");
/**
 * Поля для налаштування пароля.
 * @type {NodeListOf<HTMLElement>|null}
 */
export const passwordOptions = document.querySelectorAll(
  ".select__settings > label > input"
);
/**
 * Кнопка, яка генерує пароль.
 * @type {HTMLElement|null}
 */
export const generateBtn = document.querySelector(".generate");
/**
 * Кнопка, для копіювання пароля.
 * @type {HTMLElement|null}
 */
export const copyBtn = document.querySelector(".copied > button");
/**
 * Показує повідомлення "copy" на 3 секунди після натискання кнопки копіювання.
 * Повідомлення зникає автоматично.
 * @type {HTMLElement|null}
 */
export const copyMessage = document.querySelector(".copied > span");
/**
 * Масив з числами, для генерації пароля
 * @type {number[]}
 */
export const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
/**
 * Масив з символами, для генерації пароля
 * @type {string[]}
 */
export const symbols = ["@", "$", "#", "%"];
/**
 * Масив з схожими цифрами, для генерації пароля
 * @type {number[]}
 */
export const similarNumbers = [0, 1];
/**
 * Масив з схожими буквами в нижньому регістрі, для генерації пароля
 * @type {string[]}
 */
export const similarLowerCase = ["i", "l", "o"];
/**
 * Масив з схожими буквами в верхньому регістрі, для генерації пароля
 * @type {string[]}
 */
export const similarUpperCase = ["I", "L", "O"];
/**
 * Масив з схожими буквами, для генерації пароля
 * @type {number[] | string[]}
 */
export const similar = [
  ...similarLowerCase,
  ...similarUpperCase,
  ...similarNumbers,
];
/**
 * Масив з схожими буквами, для генерації пароля
 * @type {number[]}
 */
export const characterCode = [];

for (let i = 97; i <= 122; i++) {
  characterCode.push(i);
}
/**
 * Масив з цифрами верхнього регістру без схожих літер
 * @type {string[]}
 */
export const letterLowerCase = characterCode
  .map((i) => String.fromCharCode(i))
  .filter((item) => !similarLowerCase.includes(item));

/**
 * Масив з цифрами нижнього регістру без схожих літер
 * @type {string[]}
 */
export const letterUpperCase = letterLowerCase.map((item) => {
  return item.toUpperCase();
});

/**
 * Поле для введення надійності пароля
 * @type {HTMLElement|null}
 */
export let strengthBox = document.querySelector(".strength > div");
/**
 * Поле для індикаторів надійсності пароля
 * @type {string[]}
 */
export let strengthText = document.querySelector(".strength > div > p");

// passwordValue.value = "P4$5W0rD!";

// if (passwordValue.value === "P4$5W0rD!") {
//   passwordValue.style.color = "gray";
// } else {
//   passwordValue.style.color = "";
// }
