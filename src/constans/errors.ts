export const INCORRECT_REQUEST = {
  status: 400,
  message: "Ошибка. Переданы некорректные данные в запросе к серверу",
};
export const NOT_FOUND_ERROR = {
  status: 404,
  message: "Ошибка. Запрашиваемый ресурс не найден в базе данных",
};
export const SERVER_ERROR = {
  status: 500,
  message: "Ошибка сервера",
};
export const BAD_AUTHORISATION = {
  status: 401,
  message: "Ошибка. Необходима авторизация",
};
export const FORBIDDEN = {
  status: 403,
  message: "Ошибка. Доступ запрещен",
};
