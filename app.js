let tasks = [];

function addTask (name) {
	const newTask = {
		name: name,
		id: tasks.length + 1,
		state: "undone"
	}

	tasks.push(newTask);

	$("#undone-tasks").append(
		'<li id="task-'+ newTask.id +'">' +
			'<span class="uk-text-meta task-id">'+ newTask.id +'</span>' +
			newTask.name +
			'<a href="" uk-icon="icon: check; ratio: 1.5" class="uk-align-right"></a>' +
		'</li>'
	)
}

function doneTask (id) {
	let task = tasks.find(function (task) {
		return task.id === id
	})
	task.state = "done";

	$("#task-" + id).remove()
	$("#done-tasks").prepend(
		'<li class="uk-text-muted" id="task-'+ task.id +'">' +
			'<span class="uk-text-meta task-id">'+ task.id +'</span>' +
			task.name +
			'<a href="" uk-icon="icon: close; ratio: 1.5" class="uk-align-right done-task"></a>' +
		'</li>'
	)
}
function removeTask (id) {
	let task = tasks.find(function (task) {
		return task.id === id
	})
	tasks.splice(tasks.indexOf(task), 1);

	$("#task-" + id).remove()
}