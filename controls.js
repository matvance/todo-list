$(function () {
	$("#new-task input")
	.keypress(function (e) {
		if (e.which == 13) {
			addTask($(this).val());
			$(this).val("")
		}
	})

	$(document).on("click", "a", (e) => e.preventDefault());

	$("#new-task").on("click", "a", () => {
		addTask(
			$("#new-task input").val()
		);

		$("#new-task input").val("")
	})

	// $(document).on("click", "done-task", () => {
	// 	console.log($(this));
	// });

})