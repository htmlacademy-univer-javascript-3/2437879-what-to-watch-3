import {withHistory} from '../../mocks/mock-components.tsx';
import Logo from './logo.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<Logo />);

    render(withHistoryComponent);

    expect(screen.getByRole('link')).toHaveClass('logo__link');
  });
});
