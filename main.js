$(function () {
	$(document).on("click", ".todo-item-buttons-done", function () {
		let taskId = $(this).parent().parent().attr("id").replace("task-", "");

		tasks.getById(taskId).isDone = true;
		$(this).parent().parent().fadeOut(300, function () {
			refreshView()
		});
	})
	.on("click", ".todo-item-buttons-remove", function () {
		let taskId = $(this).parent().parent().attr("id").replace("task-", "");

		tasks.getById(taskId).isRemoved = true;
		$(this).parent().parent().fadeOut(300, function () {
			refreshView()
		});
	})
	.on("keypress", ".task-name-input", function (e) {
		if (e.which == 13) {
			tasks.addTask({
				"title": $(".task-name-input").val(),
				"clearInput": true,
			});
		}
	})
	.on("click", ".task-add-button", function () {
		tasks.addTask({
			"title": $(".task-name-input").val(),
			"clearInput": true,
		});
	});
});

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
					'<i class="material-icons todo-item-buttons-remove">backspace</i>' +
				'</div>' +
			'</li>'
		}
	}

	$(".tasks-list").html(tasksHTML);
	$(".done-tasks-list").html(doneTasksHTML);
}
