
import Link from 'next/link';

/**
 * کامپوننت نوار ناوبری اصلی سایت
 * شامل لینک به صفحات مختلف مثل خانه و بازی‌ها
 * در layout.tsx فراخوانی شده و در تمام صفحات دیده می‌شود
 */


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
