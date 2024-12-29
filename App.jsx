
import Routes from './src/navigation/Routes';
import { ArtistProvider } from './src/context/ArtistContext';

const App = () => {
  return (
    <ArtistProvider>
      <Routes />
    </ArtistProvider>
  );
};
export default App;

