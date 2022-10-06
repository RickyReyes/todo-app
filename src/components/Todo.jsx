import React from "react";

const Todo = ({ todo, theme, toggleCompleted, handleDelete }) => {
	return (
		<li
			className={"todo" + (todo.completed ? " completed " : " ") + theme}
			draggable={true}
		>
			<div
				onClick={() => toggleCompleted(todo.id)}
				className={`empty-circle  ${
					todo.completed ? " completed " : " "
				} ${theme}`}
			>
				{todo.completed && (
					<svg
						className="completed-check"
						xmlns="http://www.w3.org/2000/svg"
						width="11"
						height="9"
					>
						<path
							fill="none"
							stroke="#FFF"
							strokeWidth="2"
							d="M1 4.304L3.696 7l6-6"
						/>
					</svg>
				)}
			</div>
			<p className="todo-name">{todo.name}</p>
			<svg
				onClick={() => handleDelete(todo.id)}
				className="close-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
			>
				<path
					fill="#494C6B"
					fillRule="evenodd"
					d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
				/>
			</svg>
		</li>
	);
};

export default Todo;
