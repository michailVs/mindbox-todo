import { Button, Flex, Input } from 'antd'
import type { ChangeEvent } from 'react'

interface IInput {
  value?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onClick: () => void
}

const InputUi = (props: IInput) => {
  return (
    <Flex gap={12} style={{'width': '100%'}}>
        <Input {...props} style={{'width': '100%', 'borderRadius': 0, 'height': 'fit-content'}} placeholder='What needs to be dobe?'/>
        <Button onClick={props.onClick} color="primary" variant="solid">add</Button>
    </Flex>
  )
}

export default InputUi