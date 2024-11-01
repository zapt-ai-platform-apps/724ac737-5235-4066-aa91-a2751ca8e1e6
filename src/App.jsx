import { createSignal, Show } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import Header from './components/Header';
import BuilderForm from './components/BuilderForm';
import GeneratedPlan from './components/GeneratedPlan';
import GeneratedWebsite from './components/GeneratedWebsite';
import DesignList from './components/DesignList';
import { createEvent } from './supabaseClient';

function App() {
  const [loadingPlan, setLoadingPlan] = createSignal(false);
  const [loadingWebsite, setLoadingWebsite] = createSignal(false);

  const [projectName, setProjectName] = createSignal('');
  const [projectField, setProjectField] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [selectedFeatures, setSelectedFeatures] = createSignal([]);
  const [additionalFeatures, setAdditionalFeatures] = createSignal('');
  const [projectDesign, setProjectDesign] = createSignal('');
  const [projectAudience, setProjectAudience] = createSignal('');
  const [generatedPlan, setGeneratedPlan] = createSignal('');
  const [generatedWebsite, setGeneratedWebsite] = createSignal('');

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
      (!selectedFeatures().length && !additionalFeatures()) ||
      !projectDesign() ||
      !projectAudience()
    )
      return;

    setLoadingPlan(true);
    try {
      const features = selectedFeatures().join(', ') + (additionalFeatures() ? ', ' + additionalFeatures() : '');
      const prompt = `
من فضلك قم بإنشاء خطة مشروع احترافية لإنشاء موقع إلكتروني في مجال ${projectField()} باللغة العربية بالاستناد إلى المعلومات التالية:

اسم الموقع: ${projectName()}
وصف الموقع: ${projectDescription()}
الميزات المطلوبة: ${features}
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
      setLoadingPlan(false);
    }
  };

  const handleGenerateWebsite = async () => {
    if (
      !projectName() ||
      !projectField() ||
      !projectDescription() ||
      (!selectedFeatures().length && !additionalFeatures()) ||
      !projectDesign() ||
      !projectAudience()
    )
      return;

    setLoadingWebsite(true);
    try {
      const features = selectedFeatures().join(', ') + (additionalFeatures() ? ', ' + additionalFeatures() : '');
      const prompt = `
من فضلك قم بإنشاء كود HTML وCSS وJavaScript لموقع إلكتروني في مجال ${projectField()} باللغة العربية بالاستناد إلى المعلومات التالية:

اسم الموقع: ${projectName()}
وصف الموقع: ${projectDescription()}
الميزات المطلوبة: ${features}
التصميم المرغوب: ${projectDesign()}
الجمهور المستهدف: ${projectAudience()}

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

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-6xl mx-auto h-full flex flex-col">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BuilderForm
                  projectName={projectName}
                  setProjectName={setProjectName}
                  projectField={projectField}
                  setProjectField={setProjectField}
                  projectDescription={projectDescription}
                  setProjectDescription={setProjectDescription}
                  selectedFeatures={selectedFeatures}
                  setSelectedFeatures={setSelectedFeatures}
                  additionalFeatures={additionalFeatures}
                  setAdditionalFeatures={setAdditionalFeatures}
                  projectDesign={projectDesign}
                  setProjectDesign={setProjectDesign}
                  projectAudience={projectAudience}
                  setProjectAudience={setProjectAudience}
                  projectFields={projectFields}
                  loadingPlan={loadingPlan}
                  loadingWebsite={loadingWebsite}
                  handleGeneratePlan={handleGeneratePlan}
                  handleGenerateWebsite={handleGenerateWebsite}
                />
                <Show when={generatedPlan()}>
                  <GeneratedPlan generatedPlan={generatedPlan} />
                </Show>
                <Show when={generatedWebsite()}>
                  <GeneratedWebsite generatedWebsite={generatedWebsite} />
                </Show>
              </>
            }
          />
          <Route path="/designs" element={<DesignList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;