import styled from "styled-components";
import { TodoType } from "../types/todo";
import palette from "../styles/palette";
import { useCallback, useMemo, useState } from "react";
import TrashCanIcon from "../public/static/svg/trash_can.svg";
import CheckMarkIcon from "../public/static/svg/check_mark.svg";
import { checkTodoAPI, deletedTodoAPI } from "../lib/api/todos";

interface IProps {
  todos: TodoType[];
}

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
      }
    }

    .todo-list-header-colors {
      display: flex;
      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;
        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }
        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }

      .todo-right-side {
        display: flex;
        margin-right: 12px;
        svg {
          &:first-child {
            margin-right: 16px;
          }
        }

        .todo-trash-can {
          /* width: 16px; */
          path {
            fill: ${palette.deep_red};
          }
        }

        .todo-check-mark {
          path {
            fill: ${palette.deep_green};
          }
        }

        .todo-button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid ${palette.gray};
          background-color: transparent;
          outline: none;
        }
      }
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

// ????????? ????????? ????????? ????????? ?????? ??????
type ObjectIndexType = {
  [key: string]: number | undefined;
};


const TodoList: React.FC<IProps> = ({ todos }) => {
    const [localTodos, SetLocalTodos] = useState(todos);
  // const getTodoColorNums = useCallback(() => {
  //   let red = 0;
  //   let orange = 0;
  //   let yellow = 0;
  //   let green = 0;
  //   let blue = 0;
  //   let navy = 0;
  //   todos.forEach((todo) => {
  //     switch (todo.color) {
  //       case "red":
  //         red += 1;
  //         break;
  //       case "orange":
  //         orange += 1;
  //         break;
  //       case "yellow":
  //         yellow += 1;
  //         break;
  //       case "green":
  //         green += 1;
  //         break;
  //       case "blue":
  //         blue += 1;
  //         break;
  //       case "navy":
  //         navy += 1;
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  //   return {
  //     red,
  //     orange,
  //     yellow,
  //     green,
  //     blue,
  //     navy,
  //   };
  // }, [todos]);

  // const todoColorNums = useMemo(getTodoColorNums, [todos]);

  const todoColorNum2 = useMemo(() => {
    const colors: ObjectIndexType = {};
    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [localTodos]);

  const todo = todoColorNum2;

  const checkTodo = async(id: number) => {
    try {
      await checkTodoAPI(id);
      
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      SetLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  }

  const deletedTodo = async (id: number) => {
    try {
      await deletedTodoAPI(id);
      const newTodos = localTodos.filter((todo) => todo.id !== id);
      SetLocalTodos(newTodos);
      console.log("??????????????????.")
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          ?????? todo<span>{localTodos.length}???</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todo).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`}></div>
              <p>{todo[color]}???</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="todo-list">
        {localTodos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p
                className={`todo-text ${
                  todo.checked ? "checked-todo-text" : ""
                }`}
              >
                {todo.text}
              </p>
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <TrashCanIcon className="todo-trash-can" onClick={() => {deletedTodo(todo.id)}} />
                  <CheckMarkIcon
                    className="todo-check-mark"
                    onClick={() => {
                      checkTodo(todo.id)
                    }}
                  />
                </>
              )}
              {!todo.checked && (
                <button
                  type="button"
                  className="todo-button"
                  onClick={() => {
                    checkTodo(todo.id)
                  }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
