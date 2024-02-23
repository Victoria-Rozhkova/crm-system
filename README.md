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

- А также два лэйаута:

  - Для страниц авторизации
  - Основной, для авторизованного пользователя

- Создана навигация и защита роутов при помощи [Vue-router](https://router.vuejs.org/)
- Реализовано плавное скрытие и открытие левого меню
- Динамически отображается текущая дата и время
- Реализована валидация форм с [Vuelidate](https://vuelidate-next.netlify.app/)
- Добавлены всплывающие сообщения о действиях и об ошибке с помощью [toasts](https://materializecss.com/toasts.html)
- В качестве UI-библиотеки используется [materializecss](https://materializecss.com/)
- В качестве сервера и базы данных используется [firebase](https://firebase.google.com/)
- В качестве хранилища используется [Vuex](https://vuex.vuejs.org/)
- Реализован актуальный курс валют из [open api](https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/rub.json)
- Реализована авторизация, регистрация, сохранение сессии и выход из аккаунта
- Можно добавлять, редактировать категории
- Можно добавлять расходы и доходы
- На странице профиля можно изменить имя и язык
- На странице планирования показываются все расходы по добавленным категориям с прогресс баром, в зависимости от процента трат по отношению к указанному лимиту, а также показывается [tooltip](https://materializecss.com/tooltips.html) с суммой, которая осталась или которую превысили
- На странице истории записей можно посмотреть диаграмму расходов по категориям, реализованную с [chart.js](https://www.chartjs.org/) и [vue-chart-3](https://vue-chart-3.netlify.app/), таблицу со всеми записями с пагинацией, сделанной с помощью [vuejs-paginate-next](https://github.com/cloudeep/vuejs-paginate-next#readme) и [миксина](https://github.com/Victoria-Rozhkova/crm-system/blob/master/src/mixins/pagination.mixin.js), а также подробную информацию по каждой записи
- Реализована локализация на английский язык с [vue-i18n](https://vue-i18n.intlify.dev/)

## [Посмотреть Demo ](https://victoria-rozhkova.github.io/crm-system/)

![preview](https://raw.githubusercontent.com/Victoria-Rozhkova/crm-system/preview/home.png)

![preview](https://raw.githubusercontent.com/Victoria-Rozhkova/crm-system/preview/planning.png)

![preview](https://raw.githubusercontent.com/Victoria-Rozhkova/crm-system/preview/chart.png)

## Первый запуск

```
yarn install
```

```
yarn serve
```
