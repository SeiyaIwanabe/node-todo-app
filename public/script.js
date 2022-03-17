const tasksDOM = document.querySelector('.tasks');
const formDom = document.querySelector('.task-form');
const taskInputDom = document.querySelector('.task-input');
const formAlertDom = document.querySelector('.form-alert');

// api/v1/tasksより全てのtaskを取得する
const showTasks = async () => {
    try {
        // 自作APIを叩く
        const { data: tasks } = await axios.get('/api/v1/tasks');

        // タスクが一つもないとき
        if (tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return;
        }

        // taskを出力
        const allTasks = tasks
            .map((task) => {
                const { completed, _id, name } = task;

                return `<div class="single-task ${
                    completed && 'task-completed'
                }">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <a href="edit.html?id=${_id}" class="edit-link"
                    ><i class="fas fa-edit"></i
                ></a>
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
            })
            .join('');
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

// taksを新規作成する
formDom.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInputDom.value;

    try {
        await axios.post('/api/v1/tasks', { name: name });
        showTasks();
        taskInputDom.value = '';
        formAlertDom.style.display = 'block';
        formAlertDom.textContent = 'タスクを追加しました';
        formAlertDom.classList.add('text-success');
    } catch (err) {
        console.log(err);
        formAlertDom.style.display = 'block';
        formAlertDom.innerHTML = 'もう一度やりなおして💓';
    }

    setTimeout(() => {
        formAlertDom.style.display = 'none';
        formAlertDom.classList.remove('text-success');
    }, 3000);
});

// tasksを削除する
tasksDOM.addEventListener('click', async (e) => {
    const element = e.target;

    if (element.parentElement.classList.contains('delete-btn')) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});
