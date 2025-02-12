# event-web-app-react (React + Vite + JavaScript)

## Настройка проекта

### Шаг 1. Клонирование репозитория

Склонируйте проект на локальную машину:

```bash
git clone https://github.com/d1amond09/event-web-app-react.git
```

### Шаг 2. Настройка конфигураций

Откройте файл `config.js` и настройте порты подключения к API:

```JavaScript
const API_BASE_URL = 'https://localhost:{ваш порт}/api';
const API_BASE_URL_AUTH = 'https://localhost:{ваш порт}/api';

export { API_BASE_URL, API_BASE_URL_AUTH };
```

### Шаг 3. Запуск приложения

1. Убедитесь, что проект **EventsWebApp.API** выбран в качестве стартового.
2. Запустите приложение с помощью http/https или Container (Dockerfile)
```bash
cd your/path/to/event-web-app-react
npm run dev
```
