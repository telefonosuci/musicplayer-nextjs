import { PlaylistProvider } from "@/contexts/PlaylistProvider";
import MusicPlayerWrapper from "@/components/music-player/MusicPlayerWrapper";

export const dynamic = 'force-dynamic';

const getPlaylistdata = async () => {


  let initialPlaylist = null;
  try {
    const res = await fetch("https://dummyjson.com/c/b586-68bf-4962-a335", {
      cache: "no-store", // simulates getServerSideProps behavior
    });
    initialPlaylist = await res.json();
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }

  return initialPlaylist;
}


export default async function MusicPlayerPage() {

  const initialPlaylist = await getPlaylistdata();

  return (
    <>
      <PlaylistProvider initialPlaylist={initialPlaylist}>
        <MusicPlayerWrapper />
      </PlaylistProvider>
    </>
  );
}
