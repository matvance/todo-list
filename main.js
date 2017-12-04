let tasks = [];
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
	for (let i = 0; i < tasks.length; i++) {
		tasks[i].isDone = true;
	}
}
tasks.clearDone = function () {
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].isDone) {
			tasks[i].isRemoved = true;
		}
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
