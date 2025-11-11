# Домашнее задание 5

## Архитектурное решение
`src/agents` - реализуется запросы к апи на fetch. Минимальная логика обработок ошибок и тд. Максимально тонкий запрос

`src/controllers` - обрабатывает запросы со слоя выше, принимает через DI реализацию класса API.

`srs/main.ts` - связывает методы контроллера и ui - использует вспомогательные функции для обновления ui, которые лежат в `src/ui` и `src/helpers`


## Fetch или XHR 
для выбора той или иной технологии необходимо подставить в класс-контроллер соответсвующую реализацю запросов

`src/controllers/task.ts`
```
const fetchTaskApi = new FetchTaskApi()
const xhrTaskApi = new XhrTaskApi()
export const taskController = new TaskController(xhrTaskApi) <-- тут
```