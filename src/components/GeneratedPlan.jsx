import { useNavigate, useLocation } from '@solidjs/router';
import { Show } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

function GeneratedPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const generatedPlan = state?.generatedPlan || '';

  const handleGenerateWebsite = () => {
    navigate('/website', { state });
  };

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col text-gray-800">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600">الخطة المقترحة</h2>
        <button
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>
      </div>
      <div class="overflow-y-auto flex-1 pr-4">
        <Show when={generatedPlan}>
          <SolidMarkdown class="text-gray-700" children={generatedPlan} />
        </Show>
        <Show when={!generatedPlan}>
          <p class="text-gray-700">لا يوجد خطة لعرضها.</p>
        </Show>
      </div>
      <button
        class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={handleGenerateWebsite}
      >
        توليد الموقع
      </button>
    </div>
  );
}

export default GeneratedPlan;