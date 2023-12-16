import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import ExitLink from './exit-link.tsx';
import {withHistory} from '../../../mocks/mock-components';

describe('Component: ExitLink', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<ExitLink />);

    render(withHistoryComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
  });
});
