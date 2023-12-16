import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';
import SignInPage from './sign-in-page.tsx';
import userEvent from '@testing-library/user-event';

describe('Page: SignIn', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<SignInPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in')).toHaveLength(2);
  });

  it('should display entered values', async () => {
    const mockEmail = 'somemail@test.com';
    const mockPassword = 'password1234';
    const withHistoryComponent = withHistory(<SignInPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId('user-slice-email'), mockEmail);
    await userEvent.type(screen.getByTestId('user-slice-password'), mockPassword);

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
  });
});
