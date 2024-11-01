import { createSignal, Show } from 'solid-js';
import Header from './components/Header';
import BuilderForm from './components/BuilderForm';
import GeneratedPlan from './components/GeneratedPlan';
import { createEvent } from './supabaseClient';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [projectName, setProjectName] = createSignal('');
  const [projectField, setProjectField] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [projectFeatures, setProjectFeatures] = createSignal('');
  const [projectDesign, setProjectDesign] = createSignal('');
  const [projectAudience, setProjectAudience] = createSignal('');
  const [generatedPlan, setGeneratedPlan] = createSignal('');

  const projectFields = [
    { value: '', label: 'اختر مجال الموقع' },
    { value: 'تجارة إلكترونية', label: 'تجارة إلكترونية' },
    { value: 'تعليم', label: 'تعليم' },
    { value: 'صحة', label: 'صحة' },
    { value: 'ترفيه', label: 'ترفيه' },
    { value: 'آخر', label: 'آخر' },
  ];

  const handleGeneratePlan = async () => {
    if (
      !projectName() ||
      !projectField() ||
      !projectDescription() ||
      !projectFeatures() ||
      !projectDesign() ||
      !projectAudience()
    )
      return;

    setLoading(true);
    try {
      const prompt = `
من فضلك قم بإنشاء خطة مشروع احترافية لإنشاء موقع إلكتروني في مجال ${projectField()} باللغة العربية بالاستناد إلى المعلومات التالية:

اسم الموقع: ${projectName()}
وصف الموقع: ${projectDescription()}
الميزات المطلوبة: ${projectFeatures()}
التصميم المرغوب: ${projectDesign()}
الجمهور المستهدف: ${projectAudience()}

يجب أن تكون الخطة مفصلة وتشمل جميع العناصر الأساسية لموقع احترافي، بما في ذلك التحليل الفني، ومتطلبات التطوير، وخطط التصميم، وخطوات الإطلاق.
      `;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt.trim(),
        response_type: 'text'
      });
      setGeneratedPlan(result);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-6xl mx-auto h-full flex flex-col">
        <Header />
        <BuilderForm
          projectName={projectName}
          setProjectName={setProjectName}
          projectField={projectField}
          setProjectField={setProjectField}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          projectFeatures={projectFeatures}
          setProjectFeatures={setProjectFeatures}
          projectDesign={projectDesign}
          setProjectDesign={setProjectDesign}
          projectAudience={projectAudience}
          setProjectAudience={setProjectAudience}
          projectFields={projectFields}
          loading={loading}
          handleGeneratePlan={handleGeneratePlan}
        />
        <Show when={generatedPlan()}>
          <GeneratedPlan generatedPlan={generatedPlan} />
        </Show>
      </div>
    </div>
  );
}

export default App;