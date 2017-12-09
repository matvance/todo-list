function addTask (taskName) {
	const id = $("#undone-tasks li").length + $("#done-tasks li").length + 1;

	$("#undone-tasks").append(
		'<li id="task-'+ id +'">' +
			'<span class="uk-text-meta task-id">'+ id +'</span>' +
			'<span class="task-name">' + taskName + '</span>' +
			'<a href="" uk-icon="icon: check; ratio: 1.5" class="uk-align-right done-task"></a>' +
		'</li>'
	)
}

function doneTask (taskElement) {
	const id = taskElement.attr("id").replace("task-", "");
	const taskName = taskElement.find(".task-name").text();

	taskElement.addClass("uk-animation-reverse").addClass("uk-animation-slide-left-small");

	setTimeout(function () {
		$("#task-" + id).remove()

		$("#done-tasks").prepend(
			'<li class="uk-text-muted" id="task-'+ id +'">' +
				'<span class="uk-text-meta task-id">'+ id +'</span>' +
				'<span class="task-name">' + taskName + '</span>' +
				'<a href="" uk-icon="icon: close; ratio: 1.5" class="uk-align-right remove-task"></a>' +
			'</li>'
		);

		taskElement = $("#done-tasks").find("#task-" + id);
		taskElement.addClass("uk-animation-slide-left-small");

	}, 500);
}

function removeTask (taskElement) {
	const id = taskElement.attr("id").replace("task-", "");

	taskElement.addClass("uk-animation-reverse").addClass("uk-animation-slide-right-small");

	setTimeout(function () {
		$("#task-" + id).remove()
	}, 500)
}

function doneAll () {
	if ($("#undone-tasks li").length > 0) {
		let tasks = $("#undone-tasks li").toArray();
		
		let timeout = 0;
		tasks.forEach((task) => {
			setTimeout(doneTask, timeout, $(task))
			timeout += 300;
		})
	}
}