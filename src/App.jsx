import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';
import { SolidMarkdown } from "solid-markdown";

function App() {
  const [loading, setLoading] = createSignal(false);
  const [projectSpec, setProjectSpec] = createSignal('');
  const [generatedProject, setGeneratedProject] = createSignal('');

  const handleGenerateProject = async () => {
    if (!projectSpec()) return;

    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `من فضلك قم بكتابة وصف لمشروع ${projectSpec()} باللغة العربية.`,
        response_type: 'text',
      });
      setGeneratedProject(result);
    } catch (error) {
      console.error('Error generating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4" dir="rtl">
      <div class="max-w-3xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">منشئ المشاريع العربية</h1>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل مواصفات المشروع</h2>
          <textarea
            value={projectSpec()}
            onInput={(e) => setProjectSpec(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            rows="5"
            placeholder="اكتب مواصفات المشروع هنا..."
          ></textarea>
          <button
            class={`mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleGenerateProject}
            disabled={loading()}
          >
            <Show when={loading()}>جاري التحميل...</Show>
            <Show when={!loading()}>توليد المشروع</Show>
          </button>
        </div>

        <Show when={generatedProject()}>
          <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">وصف المشروع</h2>
            <SolidMarkdown class="text-gray-700" children={generatedProject()} />
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;