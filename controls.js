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

	$(document).on("click", ".done-task", function () {

		let task = $(this).parent();
		// MOVE ANIMATIONS TO doneTask() and removeTask() FUNCTIONS
		
		task.addClass("uk-animation-reverse").addClass("uk-animation-slide-left-small");
		setTimeout(function(){
		  task.remove();
		}, 500);


	});

})