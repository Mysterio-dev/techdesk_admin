(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const menuToggle = document.querySelector(".menu__toggle");
        const sidebar = document.querySelector(".projects");
        const content = document.querySelector(".content");
        if (menuToggle && sidebar && content) menuToggle.addEventListener("click", (function() {
            const isClosed = sidebar.classList.contains("_open");
            if (isClosed) {
                sidebar.classList.remove("_open");
                content.classList.remove("_offset");
            } else {
                sidebar.classList.add("_open");
                content.classList.add("_offset");
            }
        })); else {
            let message = "Кнопка, боковая панель или элемент с классом content не найдены на странице.";
            console.log(message);
        }
    }));
    const columnHeaders = document.querySelectorAll(".column-header h2");
    columnHeaders.forEach((header => {
        header.addEventListener("input", updateColumnTitle);
    }));
    function updateColumnTitle(event) {
        const newTitle = event.target.innerText;
        console.log("Новый заголовок:", newTitle);
    }
    const columns = document.querySelectorAll(".column");
    columns.forEach((column => {
        column.addEventListener("dragstart", dragStart);
        column.addEventListener("dragenter", dragEnter);
        column.addEventListener("dragover", dragOver);
        column.addEventListener("dragleave", dragLeave);
        column.addEventListener("drop", drop);
    }));
    let dragColumn = null;
    function dragStart(event) {
        dragColumn = event.target;
        event.target.classList.add("dragging");
    }
    function dragEnter(event) {
        if (event.target !== dragColumn) event.target.classList.add("drag-enter");
    }
    function dragOver(event) {
        event.preventDefault();
    }
    function dragLeave(event) {
        event.target.classList.remove("drag-enter");
    }
    function drop(event) {
        if (event.target !== dragColumn) {
            event.target.classList.remove("drag-enter");
            const dropZone = event.target;
            const columnsContainer = dropZone.parentNode;
            columnsContainer.insertBefore(dragColumn, dropZone.nextSibling);
        }
    }
    const addTaskButtons = document.querySelectorAll(".add-task-button");
    addTaskButtons.forEach((button => {
        button.addEventListener("click", addNewTask);
    }));
    function addNewTask(event) {
        const column = event.target.closest(".column");
        const taskList = column.querySelector(".task-list");
        const newTaskInput = column.querySelector(".new-task-input");
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.innerText = taskText;
            taskList.appendChild(newTask);
            newTaskInput.value = "";
        }
    }
    function autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = "35px";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.setAttribute("value", textarea.value);
    }
    const textareas = document.querySelectorAll(".task__header-input, .task__create-input");
    textareas.forEach((textarea => {
        textarea.addEventListener("input", autoResizeTextarea);
        textarea.style.height = "35px";
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.setAttribute("value", textarea.value);
    }));
    const task_create_textareas = document.querySelectorAll(".task__create-input");
    task_create_textareas.forEach((function(textarea) {
        function createButton() {
            const addButton = document.createElement("button");
            addButton.classList.add("task__create-add");
            addButton.textContent = "Готово";
            textarea.parentNode.insertBefore(addButton, textarea.nextSibling);
            addButton.addEventListener("click", (function() {
                if (textarea.value.trim() !== "") {
                    console.log("Добавляем задачу:", textarea.value);
                    addTaskCard(textarea.value);
                    textarea.value = "";
                    textarea.parentNode.classList.remove("_active");
                    addButton.remove();
                    checkEmpty();
                    textarea.style.height = "35px";
                }
            }));
        }
        function checkEmpty() {
            const nonEmptyTextareas = Array.from(task_create_textareas).filter((ta => ta.value.trim() !== ""));
            if (nonEmptyTextareas.length === 0) {
                const buttons = document.querySelectorAll(".task__create-add");
                buttons.forEach((button => button.remove()));
            }
        }
        function addTaskCard(text) {
            const taskTodoList = document.querySelector(".task__todolist");
            const taskCard = document.createElement("div");
            taskCard.classList.add("task__card");
            const taskCardTitle = document.createElement("div");
            taskCardTitle.classList.add("task__card-title");
            taskCardTitle.textContent = text;
            taskCard.appendChild(taskCardTitle);
            taskTodoList.appendChild(taskCard);
        }
        function updateTextarea() {
            if (textarea.value.trim() !== "") {
                const taskCreate = textarea.closest(".task__create");
                if (!taskCreate.classList.contains("_active")) {
                    taskCreate.classList.add("_active");
                    createButton();
                }
            } else {
                const taskCreate = textarea.closest(".task__create");
                taskCreate.classList.remove("_active");
                const addButton = taskCreate.querySelector(".task__create-add");
                if (addButton) {
                    addButton.remove();
                    checkEmpty();
                }
            }
        }
        textarea.addEventListener("input", updateTextarea);
    }));
    window["FLS"] = true;
    isWebp();
})();