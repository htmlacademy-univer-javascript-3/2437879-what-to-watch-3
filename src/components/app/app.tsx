import MainPage from '../../pages/main-page/main-page';

type PromoFilmProps = {
  title: string;
  genre: string;
  year: number;
}

function App(props: PromoFilmProps): JSX.Element {
  return (
    <MainPage {...props} />
  );
}

export default App;
