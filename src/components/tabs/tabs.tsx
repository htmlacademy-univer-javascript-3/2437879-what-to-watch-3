import {SyntheticEvent, useState} from 'react';
import {FilmCardType} from '../../types/films';
import {TabType} from '../../const';
import TabLink from './tab-link';
import Details from './details';
import Overview from './overview';
import Reviews from './reviews';

type TabsProps = {
  filmCard: FilmCardType;
}

export default function Tabs({filmCard}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(TabType.Overview);
  const tabs = {
    [TabType.Overview]: <Overview filmCard={filmCard} />,
    [TabType.Details]: <Details filmCard={filmCard} />,
    [TabType.Reviews]: <Reviews />,
  };

  const handleTabChange = (evt: SyntheticEvent) => {
    const targetId = evt.currentTarget.id as TabType;
    if (targetId) {
      setActiveTab(targetId);
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list" onClick={handleTabChange}>
          <TabLink
            tabType={TabType.Overview}
            activeTab={activeTab}
            onClick={handleTabChange}
          />
          <TabLink
            tabType={TabType.Details}
            activeTab={activeTab}
            onClick={handleTabChange}
          />
          <TabLink
            tabType={TabType.Reviews}
            activeTab={activeTab}
            onClick={handleTabChange}
          />
        </ul>
      </nav>
      {tabs[activeTab]}
    </div>
  );
}
