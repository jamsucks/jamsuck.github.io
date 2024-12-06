const token = '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'; // Замените на ваш токен
        const owner = 'jamsucks'; // Замените на имя владельца репозитория
        const repo = 'jamsuck.github.io'; // Замените на имя репозитория
        const path = 'counter.json'; // Путь к файлу

        const clickButton = document.getElementById('clickButton');
        const clickCountDisplay = document.getElementById('clickCount');

        // Функция для получения текущего значения счетчика
        async function getClickCount() {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            const data = await response.json();
            console.log(data)
            const content = data.clicks ?? 0;
            return content;
        }

        async function getFileSha() {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            const data = await response.json();
            console.log(response, 'Response')
            console.log(data, 'Data')
            return data.sha; // Возвращаем sha файла
        }

        async function updateClickCount(count) {
            const sha = await getFileSha(); // Получаем sha текущего файла
            console.log(sha)
            const newContent = JSON.stringify({ clicks: count });
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: 'Update click count',
                    content: btoa(newContent), // Кодируем содержимое в base64
                    sha: sha // Указываем sha текущего файла
                })
            });
        
            return response.json();
        }
        
        // Обработчик клика
        clickButton.addEventListener('click', async () => {
            let currentCount = await getClickCount();
            currentCount++;
            await updateClickCount(currentCount);
            clickCountDisplay.textContent = currentCount;
        });

        // Инициализация
        (async () => {
            const initialCount = await getClickCount();
            clickCountDisplay.textContent = initialCount;
        })();
