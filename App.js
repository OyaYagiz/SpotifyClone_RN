
import Routes from './src/navigation/Routes';
import {  ArtistProvider } from './src/context/ArtistContext';
import { AlbumsProvider } from './src/context/AlbumContext';
import { ProfileProvider } from './src/context/ProfilContex';

const App = () => {
  return (
    <ProfileProvider>
      <ArtistProvider>
      <AlbumsProvider>
      <Routes />
      </AlbumsProvider>
    </ArtistProvider>
    </ProfileProvider>
  );
};
export default App;

