import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';
import { SolidMarkdown } from "solid-markdown";

function App() {
  const [loading, setLoading] = createSignal(false);
  const [projectTitle, setProjectTitle] = createSignal('');
  const [projectSpec, setProjectSpec] = createSignal('');
  const [generatedProject, setGeneratedProject] = createSignal('');

  const handleGenerateProject = async () => {
    if (!projectTitle() || !projectSpec()) return;

    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `من فضلك قم بكتابة وصف لمشروع بعنوان "${projectTitle()}" بحيث يكون الوصف بناءً على المواصفات التالية: ${projectSpec()} .`,
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
      <div class="max-w-3xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">منشئ المشاريع العربية</h1>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md h-full">
          <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل عنوان ومواصفات المشروع</h2>
          <input
            type="text"
            value={projectTitle()}
            onInput={(e) => setProjectTitle(e.target.value)}
            class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="عنوان المشروع"
          />
          <textarea
            value={projectSpec()}
            onInput={(e) => setProjectSpec(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            rows="5"
            placeholder="مواصفات المشروع..."
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