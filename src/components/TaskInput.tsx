import React from "react";

interface Props {
  addTask: (task: string) => void;
}

class TaskInput extends React.Component<Props, { input: string }> {
  state = {
    input: ""
  };

  addTask = () => {
    const { input } = this.state;
    if (input) {
      this.props.addTask(input);
      this.setState({ input: "" });
    }
  };

  handeleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") this.addTask();
  };

  inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  render() {
    const { input } = this.state;

    return (
      <div className="task-input">
        <input
          placeholder="Текст..."
          onKeyPress={this.handeleEnter}
          onChange={this.inputChange}
          value={input}
        ></input>
        <button onClick={this.addTask}>Добавить</button>
      </div>
    );
  }
}

export default TaskInput;