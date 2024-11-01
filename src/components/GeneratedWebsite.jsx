import { useNavigate, useLocation } from '@solidjs/router';
import { saveAs } from 'file-saver';
import { Show, createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';
import JSZip from 'jszip';

function GeneratedWebsite() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [loadingWebsite, setLoadingWebsite] = createSignal(false);
  const [zipBlob, setZipBlob] = createSignal(null);
  const [error, setError] = createSignal('');

  onMount(() => {
    if (!state) {
      navigate('/');
      return;
    }
    handleGenerateWebsite();
  });

  const handleGenerateWebsite = async () => {
    setLoadingWebsite(true);
    setError('');
    try {
      const prompt = `
من فضلك قم بإنشاء كود موقع إلكتروني بسيط باللغة العربية يعتمد على المعلومات التالية:

اسم الموقع: ${state.projectName}
وصف الموقع: ${state.projectDescription}

يجب أن يتضمن الكود صفحة HTML واحدة تحمل اسم "index.html" وتحتوي على العناصر الأساسية للموقع.

التزم بالهيكل التالي في إجابتك:

{
  "files": [
    { "path": "index.html", "content": "<!DOCTYPE html>... </html>" }
  ]
}

لا تضف أي نص إضافي خارج نطاق JSON المطلوب.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt.trim(),
        response_type: 'json'
      });

      if (result && result.files) {
        const zip = new JSZip();
        result.files.forEach(file => {
          zip.file(file.path, file.content);
        });

        const blob = await zip.generateAsync({ type: 'blob' });
        setZipBlob(blob);
      } else {
        setError('حدث خطأ أثناء توليد الموقع. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error generating website:', error);
      setError('حدث خطأ أثناء توليد الموقع. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoadingWebsite(false);
    }
  };

  const downloadWebsite = () => {
    if (zipBlob()) {
      saveAs(zipBlob(), 'website.zip');
    }
  };

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-purple-600">الموقع المُولد</h2>
        <button
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>
      </div>
      <Show when={loadingWebsite()}>
        <p class="text-gray-700 mb-4">جاري التوليد، يرجى الانتظار...</p>
      </Show>
      <Show when={!loadingWebsite() && zipBlob()}>
        <p class="text-gray-700 mb-4">تم توليد الموقع بنجاح. يمكنك تنزيله كملف zip.</p>
        <button
          class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mb-4"
          onClick={downloadWebsite}
        >
          تنزيل الموقع
        </button>
      </Show>
      <Show when={!loadingWebsite() && error()}>
        <p class="text-red-600 mb-4">{error()}</p>
        <button
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mb-4"
          onClick={handleGenerateWebsite}
        >
          حاول مرة أخرى
        </button>
      </Show>
    </div>
  );
}

export default GeneratedWebsite;