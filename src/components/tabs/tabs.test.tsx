import {describe} from 'vitest';
import {makeFakeFilmCard} from '../../mocks/mock-data.ts';
import {render, screen} from '@testing-library/react';
import Tabs from './tabs.tsx';
import {TabType} from '../../const.ts';

describe('Component: Tabs', () => {
  it('should render correct', () => {
    const filmCard = makeFakeFilmCard();

    render(<Tabs filmCard={filmCard} />);

    expect(screen.getByText(TabType.Overview)).toBeInTheDocument();
    expect(screen.getByText(TabType.Details)).toBeInTheDocument();
    expect(screen.getByText(TabType.Reviews)).toBeInTheDocument();
  });
});
