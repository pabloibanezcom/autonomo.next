import { render, screen } from '@testing-library/react';
import Home from '../pages/home';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
  });
});
