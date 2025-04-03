import Drawer from '../../../components/drawer/Drawer';
import Link from 'next/link'

export default async function Aside() {

  return (
   <>
     <Drawer>
        <ul className="mt-10 space-y-4">
          <li><Link href="/"/><a href="#" className="text-white">🏠 Home</a></li>
          <li><Link href="/musicplayer"/><a href="#" className="text-white">📄 Music player</a></li>
        </ul>
      </Drawer>
    </>
  );
}
