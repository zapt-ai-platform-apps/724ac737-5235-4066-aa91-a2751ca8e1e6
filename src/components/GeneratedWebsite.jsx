import { useNavigate, useLocation } from '@solidjs/router';
import { saveAs } from 'file-saver';
import { Show, createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function GeneratedWebsite() {
  const navigate = useNavigate();
  const location = useLocation();
  const [generatedWebsite, setGeneratedWebsite] = createSignal(location.state?.generatedWebsite || '');
  const [loadingWebsite, setLoadingWebsite] = createSignal(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleGenerateWebsite = async () => {
    const state = location.state;
    if (!state) {
      navigate('/');
      return;
    }

    setLoadingWebsite(true);
    try {
      const features = state.selectedFeatures.join(', ') + (state.additionalFeatures ? ', ' + state.additionalFeatures : '');
      const prompt = `
من فضلك قم بإنشاء كود HTML وCSS وJavaScript لموقع إلكتروني في مجال ${state.projectField} باللغة العربية بالاستناد إلى المعلومات التالية:

اسم الموقع: ${state.projectName}
وصف الموقع: ${state.projectDescription}
الميزات المطلوبة: ${features}
التصميم المرغوب: ${state.projectDesign}
الجمهور المستهدف: ${state.projectAudience}

يجب أن يكون الكود كاملاً وقابلاً للتنفيذ، مع فصل ملفات HTML وCSS وJavaScript، واستخدام تعليقات داخل الكود لشرح الأجزاء المختلفة.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt.trim(),
        response_type: 'code'
      });
      setGeneratedWebsite(result);
    } catch (error) {
      console.error('Error generating website:', error);
    } finally {
      setLoadingWebsite(false);
    }
  };

  const downloadWebsite = () => {
    const blob = new Blob([generatedWebsite()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'website_code.txt');
  };

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600">الموقع المُولد</h2>
        <button
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={goBack}
        >
          رجوع
        </button>
      </div>
      <Show when={!generatedWebsite() && !loadingWebsite()}>
        <p class="text-gray-700 mb-4">اضغط على زر "توليد الموقع" للبدء في توليد الموقع.</p>
        <button
          class={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${
            loadingWebsite() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleGenerateWebsite}
          disabled={loadingWebsite()}
        >
          {loadingWebsite() ? 'جاري التوليد...' : 'توليد الموقع'}
        </button>
      </Show>
      <Show when={loadingWebsite()}>
        <p class="text-gray-700 mb-4">جاري التوليد، يرجى الانتظار...</p>
      </Show>
      <Show when={generatedWebsite()}>
        <p class="text-gray-700 mb-4">لقد تم توليد الموقع بناءً على مدخلاتك. يمكنك تنزيل الكود للاطلاع عليه.</p>
        <button
          class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mb-4"
          onClick={downloadWebsite}
        >
          تنزيل الموقع
        </button>
        <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto flex-1">
          <code>{generatedWebsite()}</code>
        </pre>
      </Show>
    </div>
  );
}

export default GeneratedWebsite;