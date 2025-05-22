import { Button, Flex } from "antd"
import { useState, type ChangeEvent } from "react"
import Todo from "../Todo/Todo"
import InputUi from "../Input/Input"

export interface ITodo {
    done: boolean,
    task: string
}

type Filter = 'all' | 'active' | 'completed'

const Todos = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [filter, setFilter] = useState<Filter>('all') 
    const [value, setValue] = useState('')

    const todoHandler = (i: number) => {
        setTodos(prev => prev.map((todo, index) => index === i ? {done: !todo.done, task: todo.task} : todo))
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const removeTodo = (i: number) => {
        setTodos(todos.filter((_, index) => index != i))
    }

    const addTodo = () => {
        if (value.length < 2) return
        setTodos(prev => prev = [...prev, {done: false, task: value}])
        setValue('')
    }

    const filterHandler = (value: Filter) => {
        setFilter(value)
    }

    const clearHandler = () => {
        setTodos(prev => prev.filter(el => !el.done))
    }

  return (
    <Flex vertical gap={12} style={{'width': '100%'}}>
        <InputUi onClick={addTodo} onChange={inputHandler} value={value}/>
        {filter === 'all' && todos.map((todo, i) => 
            <Todo onClick={() => removeTodo(i)} onChange={() => todoHandler(i)} key={i} todo={todo}/>
        )}
        {filter === 'active' && todos.map((todo, i) => {
                if (todo.done) return
                return <Todo onClick={() => removeTodo(i)} onChange={() => todoHandler(i)} key={i} todo={todo}/>
            } 
        )}
        {filter === 'completed' && todos.map((todo, i) => {
                if (!todo.done) return
                return <Todo onClick={() => removeTodo(i)} onChange={() => todoHandler(i)} key={i} todo={todo}/>
            }
        )}
        <Flex justify="space-between" align="center">
            <p className="text-gray-500 m-0">{todos.length} items left</p>
            <Flex gap={12}>
                <Button style={filter === 'all' ? {'border': 'lightgray 1px solid'}: {'border': 'transparent 1px solid'}} onClick={() => filterHandler('all')}>All</Button>
                <Button style={filter === 'active' ? {'border': 'lightgray 1px solid'}: {'border': 'transparent 1px solid'}} onClick={() => filterHandler('active')}>Active</Button>
                <Button style={filter === 'completed' ? {'border': 'lightgray 1px solid'}: {'border': 'transparent 1px solid'}} onClick={() => filterHandler('completed')}>Complete</Button>
            </Flex>
            <Button onClick={clearHandler} style={{'border': 'transparent 1px solid'}}>Clear completed</Button>
        </Flex>
    </Flex>
  )
}

export default Todos