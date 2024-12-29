
import Routes from './src/navigation/Routes';
import {  ArtistProvider } from './src/context/ArtistContext';
import { AlbumsProvider } from './src/context/AlbumContext';

const App = () => {
  return (
    <ArtistProvider>
      <AlbumsProvider>
      <Routes />
      </AlbumsProvider>
    </ArtistProvider>
  );
};
export default App;

