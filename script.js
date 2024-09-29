let tasks = [];
const taskInput = document.getElementById("taskInput"); // Sisestusväli
const taskList = document.getElementById("taskList"); // Loend
const addTaskButton = document.getElementById("addTaskButton"); // Ülesande lisamine
const filterAll = document.getElementById("filterAll"); // Kõik ülesanded
const filterCompleted = document.getElementById("filterCompleted"); // Täidetud ülesanded
const filterUncompleted = document.getElementById("filterUncompleted"); // Täitmata ülesanded
const sortTasks = document.getElementById("sortTasks"); // Ülesannete sorteerimine

// Funktsioon uue ülesande lisamiseks
function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue) {
    const task = { text: taskValue, completed: false };
    tasks.push(task);
    displayTasks();
    taskInput.value = "";
  }
}

// Funktsioon ülesannete kuvamiseks - mis staatuses, kuidas näitab
function displayTasks(filter = null) {
  taskList.innerHTML = "";
  let displayTasks = tasks;

  if (filter === "completed") {
    displayTasks = tasks.filter((task) => task.completed);
  } else if (filter === "uncompleted") {
    displayTasks = tasks.filter((task) => !task.completed);
  }

  displayTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" onchange="toggleCompletion(${index})" ${
      task.completed ? "checked" : ""
    }>
            <span class="${
              task.completed ? "completed" : ""
            }" contenteditable="true" onblur="updateTask(${index}, this.innerText)">${
      task.text
    }</span>
            <button onclick="removeTask(${index})">Kustuta</button>
        `;
    taskList.appendChild(li);
  });
}

// Funktsioon ülesande staatuse muutmiseks
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Funktsioon olemasoleva ülesande kustutamiseks
function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Funktsioon ülesannete filtreerimiseks - võtab sellest hierarhilisest järjekorrast
filterAll.addEventListener("click", () => displayTasks());
filterCompleted.addEventListener("click", () => displayTasks("completed"));
filterUncompleted.addEventListener("click", () => displayTasks("uncompleted"));

// Funktsioon ülesannete sorteerimiseks klikkamise tulemusel
sortTasks.addEventListener("click", () => {
  tasks.sort((a, b) => a.completed - b.completed);
  displayTasks();
});

// Nupu lisa kliki sündmuse lisamine
addTaskButton.addEventListener("click", addTask);
