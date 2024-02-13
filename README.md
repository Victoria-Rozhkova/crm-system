# CRM system

Приложение, которое умеет считать расходы и доходы пользователя.

- В приложении реализованы страницы:

  - Счет
  - История
  - Планирование
  - Новая запись
  - Категории
  - Профиль
  - Авторизация
  - Регистрация

- Создана навигация при помощи [Vue-router](https://router.vuejs.org/)
- Реализовано плавное скрытие и открытие левого меню
- Динамически отображается текущая дата и время
- Реализована валидация форм на странице логина и регистрации с [Vuelidate](https://vuelidate-next.netlify.app/)
- Добавлены всплывающие сообщения о действиях и об ошибке с помощью Toasts в [materializecss](https://materializecss.com/)
- Реализована авторизация и регистрация с [firebase](https://firebase.google.com/)
- Использовано хранилище [Vuex](https://vuex.vuejs.org/)
- Реализован актуальный курс валют из [open api](https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/rub.json)

## Первый запуск

```
yarn install
```

```
yarn serve
```
