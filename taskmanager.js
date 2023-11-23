const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const toggleButton = document.getElementById('toggleButton');


const priorityClasses = {
  low: 'task-low',
  medium: 'task-medium',
  high: 'task-high'
};


// Add event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskActions);
editForm.addEventListener('submit', updateTask);
toggleButton.addEventListener('click', toggleDarkMode);

// Task data
let tasks = [];

// Function to add a task
function addTask(event) {
  event.preventDefault();

  // Get form values
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDate = document.getElementById('taskDueDate').value;
  const taskPriority = document.getElementById('taskPriority').value;
  const taskStatus = document.getElementById('taskStatus').value;

  // Create a new task object
  const newTask = {
    title: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    priority: taskPriority,
    status: taskStatus,
  };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Render the updated task list
  renderTaskList();

  // Clear the form inputs
  taskForm.reset();
}

// Function to delete or edit a task
function handleTaskActions(event) {
  const target = event.target;

  // Check if the delete button is clicked
  if (target.classList.contains('delete-button')) {
    const taskIndex = target.dataset.index;
    deleteTask(taskIndex);
  }

  // Check if the edit button is clicked
  if (target.classList.contains('edit-button')) {
    const taskIndex = target.dataset.index;
    openEditModal(taskIndex);
  }

const closeButton = document.querySelector('.close');
const editModal = document.getElementById('editModal');

closeButton.addEventListener('click', () => {
  editModal.style.display = 'none';
});
}

// Function to delete a task
function deleteTask(taskIndex) {
  // Remove the task from the tasks array
  tasks.splice(taskIndex, 1);

  // Render the updated task list
  renderTaskList();
}

// Function to open the edit modal
function openEditModal(taskIndex) {
  // Get the task details
  const task = tasks[taskIndex];

  // Set the task details in the edit form
  document.getElementById('editTaskIndex').value = taskIndex;
  document.getElementById('editTaskTitle').value = task.title;
  document.getElementById('editTaskDescription').value = task.description;
  document.getElementById('editTaskDueDate').value = task.dueDate;
  document.getElementById('editTaskPriority').value = task.priority;
  document.getElementById('editTaskStatus').value = task.status;

  // Show the edit modal
  editModal.style.display = 'block';
}

// Function to update a task
function updateTask(event) {
  event.preventDefault();

  // Get the task index from the edit form
  const taskIndex = document.getElementById('editTaskIndex').value;

  // Get the updated task details from the edit form
  const updatedTask = {
    title: document.getElementById('editTaskTitle').value,
    description: document.getElementById('editTaskDescription').value,
    dueDate: document.getElementById('editTaskDueDate').value,
    priority: document.getElementById('editTaskPriority').value,
    status: document.getElementById('editTaskStatus').value,
  };

  // Update the task in the tasks array
  tasks[taskIndex] = updatedTask;

  // Render the updated task list
  renderTaskList();

  // Hide the edit modal
  editModal.style.display = 'none';
}

// Function to render the task list
function renderTaskList() {
  // Clear the task list
  taskList.innerHTML = '';

  // Render each task in the tasks array
  tasks.forEach((task, index) => {
    // Create a card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Add color based on priority
    if (task.priority === 'low') {
      card.classList.add('task-low');
    } else if (task.priority === 'medium') {
      card.classList.add('task-medium');
    } else if (task.priority === 'high') {
      card.classList.add('task-high');
    }

    // Create card content
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    // Add task details to the card content
    cardContent.innerHTML = `
      <span><b>Title:</b> ${task.title} <b>Due Date:</b> ${task.dueDate} <br> <b>Priority:</b> ${task.priority} <b>Status:</b> ${task.status}</span>
      <p><b>Description:</b> ${task.description}</p>
    `;

    // Create card actions
    const cardActions = document.createElement('div');
    cardActions.classList.add('card-actions');

    // Add edit and delete buttons to the card actions
    cardActions.innerHTML = `
      <button class="edit-button" data-index="${index}">Edit</i></button>
      <button class="delete-button" data-index="${index}">Delete</i></button>
    `;

    // Append card content and actions to the card
    card.appendChild(cardContent);
    card.appendChild(cardActions);

    // Append the card to the task list
    taskList.appendChild(card);
  });
}

// Add event listener for the sort button
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('change', sortTasks);

// Add event listener for the search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchTasks);

function sortTasks() {
  const sortBy = sortButton.value;

  // Sort the tasks array based on the selected option
  if (sortBy === 'low') {
    tasks.sort((a, b) => {
      if (a.priority === 'low' && b.priority !== 'low') {
        return -1;
      } else if (a.priority !== 'low' && b.priority === 'low') {
        return 1;
      } else {
        return a.priority.localeCompare(a.priority);
      }
    });
  } else if (sortBy === 'medium') {
    tasks.sort((a, b) => {
      if (a.priority === 'medium' && b.priority !== 'medium') {
        return -1;
      } else if (a.priority !== 'medium' && b.priority === 'medium') {
        return 1;
      } else {
        return a.priority.localeCompare(a.priority);
      }
    });
  } else if (sortBy === 'high') {
    tasks.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') {
        return -1;
      } else if (a.priority !== 'high' && b.priority === 'high') {
        return 1;
      } else {
        return b.priority.localeCompare(a.priority);
      }
    });
  } else if (sortBy === 'earliest') {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortBy === 'latest') {
    tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  // Render the updated task list
  renderTaskList();
}


// Function to toggle between dark and day mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

const taskItem = document.createElement('li');
taskItem.innerHTML = 
document.getElementById('editTaskIndex').value = taskIndex;
document.getElementById('editTaskTitle').value = taskTitle;
document.getElementById('editTaskDescription').value = taskDescription;
document.getElementById('editTaskDueDate').value = taskDueDate;
document.getElementById('editTaskPriority').value = taskPriority;
document.getElementById('editTaskStatus').value = taskStatus;
