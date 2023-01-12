import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import Axios from 'axios';
import { getTodosAPI } from "../lib/api/todos";

interface IProps {
  todos: TodoType[]
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos}/>
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    return { props: { todos: data } };
  } catch (e) {
    console.log(e);
    return { props: { todos: [] } };
  }
};

export default app;
