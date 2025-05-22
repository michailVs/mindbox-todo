import { Button, Checkbox, Flex } from "antd"
import type { ITodo } from "../Todos/Todos"


const Todo = ({todo, onChange, onClick}: {todo: ITodo, onChange: () => void, onClick: () => void}) => {
  return (
    <Flex gap={18} align='center' justify='space-between' style={{'border': '1px solid lightgray', 'padding': '10px', 'background': `${todo.done ? 'lightgray' : 'white'}`}}>
        <Checkbox checked={todo.done} onChange={onChange}/>
        <h2 style={todo.done ? {'textDecoration': 'line-through'} : {}}>{todo.task}</h2>
        <Button onClick={onClick} color="danger" variant="solid" style={{'color': 'white'}}>X</Button>
    </Flex>
  )
}

export default Todo