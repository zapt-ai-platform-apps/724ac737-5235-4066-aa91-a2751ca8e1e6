import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function BuilderForm() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = createSignal('');
  const [projectType, setProjectType] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGeneratePlan = async () => {
    if (!projectName() || !projectDescription() || !projectType()) return;

    setLoading(true);

    try {
      const prompt = `
من فضلك قم بإنشاء خطة مشروع احترافية لإنشاء موقع إلكتروني باللغة العربية بالاستناد إلى المعلومات التالية:

اسم الموقع: ${projectName()}
نوع الموقع: ${projectType()}
وصف الموقع: ${projectDescription()}

يجب أن تكون الخطة مفصلة وتشمل جميع العناصر الأساسية لموقع احترافي، بما في ذلك التحليل الفني، ومتطلبات التطوير، وخطط التصميم، وخطوات الإطلاق.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt.trim(),
        response_type: 'text'
      });
      navigate('/plan', {
        state: {
          generatedPlan: result,
          projectName: projectName(),
          projectType: projectType(),
          projectDescription: projectDescription()
        }
      });
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWebsite = () => {
    if (!projectName() || !projectDescription() || !projectType()) return;

    navigate('/website', {
      state: {
        projectName: projectName(),
        projectType: projectType(),
        projectDescription: projectDescription()
      }
    });
  };

  const siteTypes = [
    'مدونة',
    'موقع إخباري',
    'متجر إلكتروني',
    'موقع شركة',
    'محفظة أعمال',
    'منتدى',
    'شبكة اجتماعية',
    'موقع تعليمي',
    'موقع شخصي',
    'أخرى'
  ];

  return (
    <div class="bg-white p-8 rounded-lg shadow-md h-full text-gray-800">
      <h2 class="text-3xl font-bold mb-6 text-purple-600 text-center">ادخل تفاصيل الموقع</h2>
      <div class="space-y-6">
        <input
          type="text"
          value={projectName()}
          onInput={(e) => setProjectName(e.target.value)}
          class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-lg"
          placeholder="اسم الموقع"
        />
        <select
          value={projectType()}
          onChange={(e) => setProjectType(e.target.value)}
          class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-lg bg-white"
        >
          <option value="" disabled>
            اختر نوع الموقع
          </option>
          {siteTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <textarea
          value={projectDescription()}
          onInput={(e) => setProjectDescription(e.target.value)}
          class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-lg"
          rows="4"
          placeholder="وصف الموقع..."
        ></textarea>
        <div class="flex flex-col sm:flex-row sm:space-x-4 sm:space-x-reverse">
          <button
            class={`mt-4 flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
            }`}
            onClick={handleGeneratePlan}
            disabled={loading()}
          >
            <Show when={!loading()}>توليد الخطة</Show>
            <Show when={loading()}>جاري التوليد...</Show>
          </button>
          <button
            class={`mt-4 flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              !projectName() || !projectDescription() || !projectType() || loading()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600'
            }`}
            onClick={handleGenerateWebsite}
            disabled={!projectName() || !projectDescription() || !projectType() || loading()}
          >
            توليد الموقع
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuilderForm;