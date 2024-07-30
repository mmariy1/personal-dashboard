fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `📸: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("pt-BR", {timeStyle: 'short' })
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});


// to-do list 

document.getElementById("add-btn").addEventListener("click", addNewTask);

document.getElementById("to-do-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é Enter
        addNewTask();
    }
})

// Carregar tarefas do local storage ao carregar a página
window.onload = loadTasks;

function addNewTask() {
    const inputValue = document.getElementById("to-do-input").value;
    if (inputValue === '') {
        alert("Digite uma tarefa para adicioná-la");
        return;
    }
    
    addTaskToList(inputValue);
    saveTask(inputValue);
    document.getElementById("to-do-input").value = "";
}

function addTaskToList(task) {
    const li = document.createElement("li");
    const t = document.createTextNode(task);
    li.appendChild(t);

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("✖️");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";
        removeTask(task);
    };

    document.getElementById("to-do-list").appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

