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
  const [projectGoals, setProjectGoals] = createSignal('');
  const [projectAudience, setProjectAudience] = createSignal('');
  const [projectBudget, setProjectBudget] = createSignal('');
  const [projectTimeline, setProjectTimeline] = createSignal('');
  const [projectTechnologies, setProjectTechnologies] = createSignal('');
  const [generatedProject, setGeneratedProject] = createSignal('');

  const projectTypes = [
    { value: '', label: 'اختر نوع المشروع' },
    { value: 'تجاري', label: 'تجاري' },
    { value: 'تعليمي', label: 'تعليمي' },
    { value: 'صناعي', label: 'صناعي' },
    { value: 'تكنولوجي', label: 'تكنولوجي' },
    { value: 'صحي', label: 'صحي' },
    { value: 'آخر', label: 'آخر' },
  ];

  const handleGenerateProject = async () => {
    if (
      !projectTitle() ||
      !projectType() ||
      !projectSpec() ||
      !projectGoals() ||
      !projectAudience() ||
      !projectBudget() ||
      !projectTimeline() ||
      !projectTechnologies()
    )
      return;

    setLoading(true);
    try {
      const prompt = `
من فضلك قم بإنشاء خطة مشروع احترافية باللغة العربية بالاستناد إلى المعلومات التالية:

عنوان المشروع: ${projectTitle()}
نوع المشروع: ${projectType()}
مواصفات المشروع: ${projectSpec()}
الأهداف: ${projectGoals()}
الجمهور المستهدف: ${projectAudience()}
الميزانية: ${projectBudget()}
الجدول الزمني: ${projectTimeline()}
التقنيات المستخدمة: ${projectTechnologies()}

يجب أن تكون الخطة مفصلة وتشمل جميع العناصر الأساسية لمشروع احترافي.
`;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
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
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-4xl mx-auto h-full flex flex-col">
        <Header />
        <ProjectForm
          projectTitle={projectTitle}
          setProjectTitle={setProjectTitle}
          projectType={projectType}
          setProjectType={setProjectType}
          projectSpec={projectSpec}
          setProjectSpec={setProjectSpec}
          projectGoals={projectGoals}
          setProjectGoals={setProjectGoals}
          projectAudience={projectAudience}
          setProjectAudience={setProjectAudience}
          projectBudget={projectBudget}
          setProjectBudget={setProjectBudget}
          projectTimeline={projectTimeline}
          setProjectTimeline={setProjectTimeline}
          projectTechnologies={projectTechnologies}
          setProjectTechnologies={setProjectTechnologies}
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