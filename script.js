function loadList(name = "myList") {
    return JSON.parse(localStorage.getItem(name)) || {
        "name": name,
        "auto_id": 1,
        "items": {}
    };
}

function saveList(list) {
    localStorage.setItem(list.name, JSON.stringify(list));
}

function showList(list) {
    Object.values(list.items).forEach((item) => showItem(item));
}

function clearList(list) {
    list.auto_id = 1;
    list.items = {};
    saveList(list);
}

function addItem(list, item) {
    id = list.auto_id
    item.id = id
    list.items[id] = item;
    list.auto_id = id + 1;
    saveList(list);
}

function showItem(item) {
    let item_id = 'item' + item.id;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item_id
    checkbox.checked = item.is_complete;
    checkbox.addEventListener("change", handleChange);

    let label = document.createElement('label');
    label.setAttribute("for", item_id);
    label.innerHTML = item.title;

    let newItem = document.createElement("li");
    newItem.appendChild(checkbox);
    newItem.appendChild(label);

    document.getElementById("todoList").appendChild(newItem);
}

function updateItemStatus(list, item_id, is_complete) {
    list.items[item_id]["is_complete"] = is_complete;
    saveList(list);
}

var list;

function handleLoad() {
    list = loadList();
    showList(list);

    console.log(list);
}

function handleClick() {
    let title = document.getElementById("todoInput").value;
    let item = {
        "title": title,
        "is_complete": false
    }
    addItem(list, item);
    showItem(item);
    clear();

    console.log(list);
};

function handleChange() {
    updateItemStatus(list, this.id.replace("item", ""), this.checked);

    console.log(list);
}

function clear() {
    todoInput.value = "";
}
