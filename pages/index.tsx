import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "마트 가서 장보기", color: "red", checked: false },
  { id: 2, text: "코딩하기", color: "orange", checked: true },
  { id: 3, text: "Nest.js 연습하기", color: "yellow", checked: false },
  { id: 4, text: "Next.js 연습하기", color: "green", checked: true },
  { id: 5, text: "게임 개발하기", color: "blue", checked: false },
  { id: 6, text: "분리수거 하기", color: "navy", checked: false },
]

const index: NextPage = () => {
  return <TodoList todos={todos}/>
};

export default index;
