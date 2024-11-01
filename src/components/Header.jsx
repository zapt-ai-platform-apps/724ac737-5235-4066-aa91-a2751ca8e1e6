import { NavLink } from '@solidjs/router';

function Header() {
  return (
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-purple-600">منشئ المواقع الاحترافية</h1>
      <nav class="flex flex-row-reverse space-x-4 space-x-reverse">
        <NavLink href="/" end activeClass="text-purple-600 font-semibold" class="text-gray-700 hover:text-purple-600 cursor-pointer">
          الصفحة الرئيسية
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;