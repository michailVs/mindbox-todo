import { fireEvent, render, screen, within } from "@testing-library/react"
import Todos from "./Todos"


describe('Todos component', () => {
    beforeEach(() => {
        render(<Todos />)
    })

    test('Добавляет задачу с данными', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: /add/i})

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'by mcts'}})
        expect(screen.getByRole('textbox')).toHaveValue('by mcts')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.getByRole('heading', {name: 'by mcts'})).toBeInTheDocument()
    })

    test('не добавляет пустую задачу при нажатии Add без value или value.length < 2', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: /add/i})

        fireEvent.change(screen.getByRole('textbox'), {target: {value: ''}})
        expect(screen.getByRole('textbox')).toHaveValue('')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.queryAllByRole('heading')[0]).toBeUndefined()

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'i'}})
        expect(screen.getByRole('textbox')).toHaveValue('i')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('i')
        expect(screen.queryAllByRole('heading')[0]).toBeUndefined()

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'asfa'}})
        expect(screen.getByRole('textbox')).toHaveValue('asfa')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.queryAllByRole('heading', {name: 'asfa'})[0]).toBeInTheDocument()
    })

    test('Отметить задачу выполненой', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: /add/i})

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'check me'}})
        expect(screen.getByRole('textbox')).toHaveValue('check me')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.queryByRole('heading', {name: 'check me'})).toBeInTheDocument()

        const taskNode = screen.queryByRole('heading', {name: 'check me'})
        const taskContainer = taskNode?.closest('div')
        if(!taskContainer) throw new Error('Не нашли контейнер задачи')

        const checkbox = within(taskContainer).getByRole('checkbox')

        expect(checkbox).not.toBeChecked()

        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })

    test('Удаление задачи', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: /add/i})

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'check me'}})
        expect(screen.getByRole('textbox')).toHaveValue('check me')
        fireEvent.click(btn)
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.queryByRole('heading', {name: 'check me'})).toBeInTheDocument()

        expect(screen.getByRole('button', {name: 'X'})).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', {name: 'X'}))

        expect(screen.queryByRole('heading', {name: 'check me'})).not.toBeInTheDocument()
    })

    test('Удаление одной задачи из множества', () => {
        const arrValue = ['task 1', 'task 2', 'task 3', 'task 4']
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: /add/i})


        arrValue.forEach(el => {
            fireEvent.change(screen.getByRole('textbox'), {target: {value: el}})
            expect(screen.getByRole('textbox')).toHaveValue(el)
            fireEvent.click(btn)
            expect(screen.getByRole('textbox')).toHaveValue('')
            expect(screen.queryByRole('heading', {name: el})).toBeInTheDocument()
        })

        const removeBtn = within(screen.getByRole('heading', {name: arrValue[2]}).closest('div')!).getByRole('button', {name: 'X'})
        expect(removeBtn).toBeInTheDocument()

        fireEvent.click(removeBtn)

        expect(screen.queryByRole('heading', {name: arrValue[2]})).not.toBeInTheDocument()
    })
})