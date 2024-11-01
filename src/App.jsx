import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import ProjectDescription from './components/ProjectDescription';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [projectTitle, setProjectTitle] = createSignal('');
  const [projectType, setProjectType] = createSignal('');
  const [projectSpec, setProjectSpec] = createSignal('');
  const [generatedProject, setGeneratedProject] = createSignal('');

  const projectTypes = [
    { value: '', label: 'اختر نوع المشروع' },
    { value: 'تجاري', label: 'تجاري' },
    { value: 'تعليمي', label: 'تعليمي' },
    { value: 'صناعي', label: 'صناعي' },
    { value: 'تكنولوجي', label: 'تكنولوجي' },
    { value: 'صحي', label: 'صحي' },
  ];

  const handleGenerateProject = async () => {
    if (!projectTitle() || !projectType() || !projectSpec()) return;

    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `من فضلك قم بكتابة وصف لمشروع ${projectType()} بعنوان "${projectTitle()}" بحيث يكون الوصف بناءً على المواصفات التالية: ${projectSpec()} .`,
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
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-4xl mx-auto h-full">
        <Header />
        <ProjectForm
          projectTitle={projectTitle}
          setProjectTitle={setProjectTitle}
          projectType={projectType}
          setProjectType={setProjectType}
          projectSpec={projectSpec}
          setProjectSpec={setProjectSpec}
          projectTypes={projectTypes}
          loading={loading}
          handleGenerateProject={handleGenerateProject}
        />
        <Show when={generatedProject()}>
          <ProjectDescription generatedProject={generatedProject} />
        </Show>
      </div>
    </div>
  );
}

export default App;