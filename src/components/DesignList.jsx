import { For } from 'solid-js';

function DesignList() {
  const designs = [
    {
      id: 1,
      name: 'تصميم حديث',
      description: 'تصميم يتميز بالحداثة والبساطة مع خطوط نظيفة',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Modern+Design',
    },
    {
      id: 2,
      name: 'تصميم كلاسيكي',
      description: 'تصميم كلاسيكي يناسب المواقع الرسمية والتجارية',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Classic+Design',
    },
    {
      id: 3,
      name: 'تصميم إبداعي',
      description: 'تصميم إبداعي بألوان زاهية وعناصر مبتكرة',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Creative+Design',
    },
  ];

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">قائمة بالتصميمات</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={designs}>
          {(design) => (
            <div class="border p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
              <img src={design.imageUrl} alt={design.name} class="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 class="text-xl font-semibold mb-2">{design.name}</h3>
              <p class="text-gray-700">{design.description}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default DesignList;