import { render, screen } from '@testing-library/react';
import App from './App';

test('render', () => {
    render(<App />)
    const btn = screen.getByText('All')
    expect(btn).toBeInTheDocument()
})