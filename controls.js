$(function () {	
	$(document).on("click", ".todo-item-buttons-done", function () {
		let taskId = $(this).parent().parent().attr("id").replace("task-", "");

		tasks.getById(taskId).isDone = true;
		$(this).parent().parent().fadeOut(200, function () {
			refreshView()
		});
	})
	.on("click", ".todo-item-buttons-remove", function () {
		let taskId = $(this).parent().parent().attr("id").replace("task-", "");

		tasks.getById(taskId).isRemoved = true;
		$(this).parent().parent().fadeOut(200, function () {
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
	.on("click", ".todo-done-all-button", function () {
		tasks.doneAll();
		refreshView();
	})
	.on("click", ".todo-clear-all-button", function () {
		tasks.clearDone();
		refreshView();
	})
	$(".add-task-button").click(function () {
		tasks.addTask({
			"title": $(".task-name-input").val(),
			"clearInput": true,
		});
	});
});