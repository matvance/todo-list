$(function () {
	$("#new-task input")
	.keypress(function (e) {
		if (e.which == 13 && $(this).val()) {
			addTask($(this).val());
			$(this).val("")
		}
	})

	$(document).on("click", "a", (e) => e.preventDefault());

	$("#new-task").on("click", "a", () => {
		let taskInput = $("#new-task input");
		
		if (taskInput.val()) {
			addTask(
				taskInput.val()
			);
		}
		
		taskInput.val("")
	})

	$(document)
	.on("click", ".done-task", function () {
		const taskElement = $(this).parent();

		doneTask(taskElement);
	})
	.on("click", ".remove-task", function () {
		const taskElement = $(this).parent();

		removeTask(taskElement);
	});

})