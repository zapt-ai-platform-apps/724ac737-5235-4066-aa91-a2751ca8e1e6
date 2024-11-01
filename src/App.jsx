import { createSignal, Show } from 'solid-js';
import Header from './components/Header';
import BuilderForm from './components/BuilderForm';
import GeneratedPlan from './components/GeneratedPlan';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [projectName, setProjectName] = createSignal('');
  const [projectType, setProjectType] = createSignal('');
  const [projectField, setProjectField] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [projectFeatures, setProjectFeatures] = createSignal('');
  const [projectPlatforms, setProjectPlatforms] = createSignal('');
  const [projectDesign, setProjectDesign] = createSignal('');
  const [projectAudience, setProjectAudience] = createSignal('');
  const [generatedPlan, setGeneratedPlan] = createSignal('');

  const projectTypes = [
    { value: '', label: 'اختر نوع المشروع' },
    { value: 'موقع إلكتروني', label: 'موقع إلكتروني' },
    { value: 'تطبيق جوال', label: 'تطبيق جوال' },
    { value: 'تطبيق سطح مكتب', label: 'تطبيق سطح مكتب' },
    { value: 'آخر', label: 'آخر' },
  ];

  const projectFields = [
    { value: '', label: 'اختر مجال المشروع' },
    { value: 'تجارة إلكترونية', label: 'تجارة إلكترونية' },
    { value: 'تعليم', label: 'تعليم' },
    { value: 'صحة', label: 'صحة' },
    { value: 'ترفيه', label: 'ترفيه' },
    { value: 'آخر', label: 'آخر' },
  ];

  const handleGeneratePlan = async () => {
    if (
      !projectName() ||
      !projectType() ||
      !projectField() ||
      !projectDescription() ||
      !projectFeatures() ||
      !projectPlatforms() ||
      !projectDesign() ||
      !projectAudience()
    )
      return;

    setLoading(true);
    try {
      const prompt = `
من فضلك قم بإنشاء خطة مشروع احترافية لإنشاء ${projectType()} في مجال ${projectField()} باللغة العربية بالاستناد إلى المعلومات التالية:

اسم المشروع: ${projectName()}
وصف المشروع: ${projectDescription()}
الميزات المطلوبة: ${projectFeatures()}
منصة الاستهداف: ${projectPlatforms()}
التصميم المرغوب: ${projectDesign()}
الجمهور المستهدف: ${projectAudience()}

يجب أن تكون الخطة مفصلة وتشمل جميع العناصر الأساسية لمشروع احترافي، بما في ذلك التحليل الفني، ومتطلبات التطوير، وخطط التصميم، وخطوات الإطلاق.
      `;
      const response = await fetch('/api/generatePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setGeneratedPlan(result.plan);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-6xl mx-auto h-full flex flex-col">
        <Header />
        <BuilderForm
          projectName={projectName}
          setProjectName={setProjectName}
          projectType={projectType}
          setProjectType={setProjectType}
          projectField={projectField}
          setProjectField={setProjectField}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          projectFeatures={projectFeatures}
          setProjectFeatures={setProjectFeatures}
          projectPlatforms={projectPlatforms}
          setProjectPlatforms={setProjectPlatforms}
          projectDesign={projectDesign}
          setProjectDesign={setProjectDesign}
          projectAudience={projectAudience}
          setProjectAudience={setProjectAudience}
          projectTypes={projectTypes}
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