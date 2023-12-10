import {TabType} from '../../const';
import {SyntheticEvent} from 'react';
import cn from 'classnames';

type TabLinkProps = {
  tabType: TabType;
  activeTab: TabType;
  onClick: (evt: SyntheticEvent) => void;
};

export default function TabLink({ tabType, activeTab, onClick }: TabLinkProps): JSX.Element {
  return (
    <li
      className={cn('film-nav__item', tabType === activeTab && 'film-nav__item--active')}
      onClick={onClick}
      id={tabType}
      data-testid={tabType}
    >
      <a className="film-nav__link">{tabType}</a>
    </li>
  );
}
