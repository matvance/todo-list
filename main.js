let tasks = [];
let lastActionItemsIds = [];

tasks.getById = function (id) {
	return this.filter(function (item) {
		return item.id == id;
	})[0];
}
/*
tasks.addTask(
	{
		"title": "",
		"clearInput": false,
		"refreshView": true
	}
);
*/
tasks.addTask = function (params) {
	if (params.title) {
		tasks.push(
			{
				"id": tasks.length + 1,
				"title": params.title,
				"isDone": false,
				"isRemoved": false
			}
		)
	}
	if (params.clearInput) {
		$(".task-name-input").val("");
	}
	if (params.refreshView || !params.hasOwnProperty("refreshView")) {
		refreshView();
	}
}
tasks.doneAll = function () {
	let itemsIds = [];

	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		if (!task.isDone) {
			task.isDone = true;
			itemsIds.push(task.id);
		}
	}

	lastActionItemsIds = itemsIds;

	if (itemsIds.length > 0) {
		showAlert("done-all");
	}
}
tasks.clearDone = function () {
	let itemsIds = [];
	
	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		if (task.isDone) {
			task.isRemoved = true;
			itemsIds.push(task.id);
		}
	}

	lastActionItemsIds = itemsIds;

	if (itemsIds.length > 0) {
		showAlert("clear-all");
	}
}

function refreshView () {
	let tasksHTML = "";
	let doneTasksHTML = "";

	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];

		if(!task.isDone) {
			tasksHTML += 
			'<li class="list-group-item align-middle todo-item" id="task-' + task.id + '">' +
				'<span class="todo-item-title"><small class="todo-item-id">' + task.id + '</small>' + task.title + '</span>' +
				'<div class="float-right todo-item-buttons">' +
					'<i class="material-icons todo-item-buttons-done">done</i>' +
				'</div>' +
			'</li>'
		} else if(task.isDone && !task.isRemoved) {
			doneTasksHTML += 
			'<li class="list-group-item align-middle todo-item done" id="task-'+ task.id +'">' +
				'<span class="todo-item-title"><small class="todo-item-id">'+ task.id + '</small>' + task.title + '</span>' +
				'<div class="float-right todo-item-buttons">' +
					'<i class="material-icons todo-item-buttons-remove">clear</i>' +
				'</div>' +
			'</li>'
		}
	}

	$(".tasks-list").html(tasksHTML);
	$(".done-tasks-list").html(doneTasksHTML);
}

function showAlert (action) {
	let alertText = "";
	if (action == "done-all") {
		alertText = '<span class="text-success">All tasks marked as done</span>';
	} else if (action == "clear-all") {
		alertText = '<span class="text-danger">All done tasks removed</span>';
	}

	const alertHtml = 
	'<div class="alert alert-light " role="alert">' +
		alertText +
		'<a href="" action="' + action + '" class="float-right text-secondary undo-button">undo</a>' +
	'</div>';

	$(".alerts-wrapper").finish();
	$(".alert").hide();
	$(".alerts-wrapper").append(alertHtml).hide().fadeIn(300).delay(3000).fadeOut(800);
}

function undoAction (action) {
	for (let i = 0; i < lastActionItemsIds.length; i++) {
		if (action == "done-all") {
			tasks.getById(lastActionItemsIds[i]).isDone = false;
		} else if (action == "clear-all") {
			tasks.getById(lastActionItemsIds[i]).isRemoved = false;
		}
	}

	refreshView();
}