# Тестовое задание. Работа с данными, полученными из API.

Приложение выводит посты с возможностью взаимодейтвовать с ними.

## Требования:

* Использовать React.js, Redux-toolkit
* Использовать компонентный подход для создания приложения
* Приложение должно быть отзывчивым и хорошо выглядеть на разных устройствах (мобильные телефоны, планшеты, настольные компьютеры)
* Работа со стилями на свое усмотрение(без использования библиотек)
* В качестве API использовать сервис JSONPlaceholder - Free Fake REST API (typicode.com)

## Описание приложения «Посты»: 

### Метод API: /posts

Выводятся все посты из API постранично, по умолчанию 10 штук на странице. Есть возможность изменить количество выводимых постов (10, 20, 50, 100, все). При перезагрузке изменения сохраняются.(использовано localStoradge)

Каждый пост состоит из названия, имени пользователя (метод API: /users), его добавившего, основного текста, кнопок «Комментарии», «Редактировать», «Удалить» и «В избранное» (сделано иконками), а также чекбокса, позволяющего выделять несколько постов.

В API есть методы добавления, удаления и редактирования. Данные на
сервере при этом не изменятся, но на странице изменения отображаются.

## Описание кнопок

* «Комментарии»: 

кнопка имеет два состояния. По умолчанию кнопка неактивна. При нажатии на неё, она становится активной, а под постом появляются комментарии. У каждого
комментария отображается имя отправителя, его e-mail и текст самого комментария. При
повторном нажатии кнопки, блок с комментариями скрывается, кнопка снова становится
неактивной. Метод API: /comments.

* «Редактировать»: 

при нажатии на кнопку появляется возможность изменить текст поста, его название и пользователя, от чьего имени опубликован пост. В режиме редактирования пользователь может сохранить или же отменить внесённые изменения.

* «Удалить»: 

появляется всплывающее окно с подтверждением удаления. При утвердительном ответе пост убирается со страницы, при отрицательном ничего не происходит.

* «В избранное»: 

пост должен как-либо выделиться внешне. Если нажать на кнопку повторно – пост удаляется из избранных.

* Чекбокс: 

если хотя бы один пост отмечен чекбоксом, появляются две кнопки (к примеру, снизу) – «Удалить» и «В избранное». При нажатии на каждую из них всплывает окно с подтверждением. После утвердительного ответа происходит соответствующее массовое действие (удалить или добавить в избранное все отмеченные посты). После отрицательного – ничего не происходит, чекбоксы при этом остаются активными.

## Фильтры и сортировка

Сверху присутствуют три фильтра: по названию поста, по имени пользователя, по
нахождению в списке избранных. Фильтр по имени пользователя реализован в виде выпадающего списка.

Пользователь имеет возможность сортировать посты в обе стороны по ID, названию,
имени пользователя и по нахождению в списке избранных.

Также, в верхней части размещена кнопка добавления нового поста. При нажатии
на неё появляется всплывающее окно, в котором пользователь может указать название нового поста, его текст, а также выбрать пользователя, от чьего имени пост будет размещён. При сохранении пост добавляется на страницу.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
