import {TabType} from '../../const.ts';
import TabLink from './tab-link.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: TabLink', () => {
  it('should render correct, when active other tab', () => {
    const tabType = TabType.Overview;
    const activeTab = TabType.Details;
    const onClick = vi.fn();

    render(<TabLink tabType={tabType} activeTab={activeTab} onClick={onClick} />);

    expect(screen.getByText(tabType)).toBeInTheDocument();
    expect(screen.getByTestId(tabType)).not.toHaveClass('film-nav__item--active');
  });

  it('should render correct, when this tab is active', () => {
    const tabType = TabType.Overview;
    const onClick = vi.fn();

    render(<TabLink tabType={tabType} activeTab={tabType} onClick={onClick} />);

    expect(screen.getByText(tabType)).toBeInTheDocument();
    expect(screen.getByTestId(tabType)).toHaveClass('film-nav__item--active');
  });
});
