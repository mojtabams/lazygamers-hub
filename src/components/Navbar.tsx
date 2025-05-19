
import Link from 'next/link';

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-800 text-white p-4">
//       <h1 className="text-xl">Navbar</h1>
//     </nav>
//   );
// }

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/">خانه</Link></li>
        <li><Link href="/games">بازی‌ها</Link></li>
      </ul>
    </nav>
  );
}
