import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { For } from 'solid-js';
import { createEvent } from '../supabaseClient';

function BuilderForm() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = createSignal(false);
  const [loadingWebsite, setLoadingWebsite] = createSignal(false);

  const [projectName, setProjectName] = createSignal('');
  const [projectField, setProjectField] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [selectedFeatures, setSelectedFeatures] = createSignal([]);
  const [additionalFeatures, setAdditionalFeatures] = createSignal('');
  const [projectDesign, setProjectDesign] = createSignal('');
  const [projectAudience, setProjectAudience] = createSignal('');

  const projectFields = [
    { value: '', label: 'اختر مجال الموقع' },
    { value: 'تجارة إلكترونية', label: 'تجارة إلكترونية' },
    { value: 'تعليم', label: 'تعليم' },
    { value: 'صحة', label: 'صحة' },
    { value: 'ترفيه', label: 'ترفيه' },
    { value: 'آخر', label: 'آخر' },
  ];

  const featureOptions = [
    { value: 'تسجيل الدخول وتسجيل الحساب', label: 'تسجيل الدخول وتسجيل الحساب' },
    { value: 'سلة التسوق', label: 'سلة التسوق' },
    { value: 'محرك بحث', label: 'محرك بحث' },
    { value: 'دعم متعدد اللغات', label: 'دعم متعدد اللغات' },
    { value: 'معرض الصور', label: 'معرض الصور' },
    { value: 'نظام تواصل مع العملاء', label: 'نظام تواصل مع العملاء' },
    { value: 'مدونة', label: 'مدونة' },
    { value: 'نماذج اتصال', label: 'نماذج اتصال' },
    { value: 'خرائط الموقع', label: 'خرائط الموقع' },
    { value: 'تسجيل النشرات البريدية', label: 'تسجيل النشرات البريدية' },
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
      navigate('/plan', { state: { generatedPlan: result } });
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
      navigate('/website', { state: { generatedWebsite: result } });
    } catch (error) {
      console.error('Error generating website:', error);
    } finally {
      setLoadingWebsite(false);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل تفاصيل الموقع</h2>
      <div class="space-y-4">
        <input
          type="text"
          value={projectName()}
          onInput={(e) => setProjectName(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="اسم الموقع"
        />
        <select
          value={projectField()}
          onChange={(e) => setProjectField(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <For each={projectFields}>
            {(field) => (
              <option value={field.value} disabled={field.value === ''}>
                {field.label}
              </option>
            )}
          </For>
        </select>
        <textarea
          value={projectDescription()}
          onInput={(e) => setProjectDescription(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          rows="3"
          placeholder="وصف الموقع..."
        ></textarea>
        <div class="space-y-2">
          <label class="font-semibold text-gray-700">الميزات المطلوبة:</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <For each={featureOptions}>
              {(feature) => (
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id={feature.value}
                    value={feature.value}
                    checked={selectedFeatures().includes(feature.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFeatures([...selectedFeatures(), feature.value]);
                      } else {
                        setSelectedFeatures(selectedFeatures().filter((item) => item !== feature.value));
                      }
                    }}
                    class="cursor-pointer"
                  />
                  <label for={feature.value} class="mr-2 cursor-pointer">
                    {feature.label}
                  </label>
                </div>
              )}
            </For>
          </div>
          <textarea
            value={additionalFeatures()}
            onInput={(e) => setAdditionalFeatures(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            rows="2"
            placeholder="ميزات إضافية..."
          ></textarea>
        </div>
        <input
          type="text"
          value={projectDesign()}
          onInput={(e) => setProjectDesign(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="التصميم المرغوب (ألوان، نمط...)"
        />
        <input
          type="text"
          value={projectAudience()}
          onInput={(e) => setProjectAudience(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="الجمهور المستهدف"
        />
        <div class="flex space-x-4 space-x-reverse">
          <button
            class={`mt-4 flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
              loadingPlan() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleGeneratePlan}
            disabled={loadingPlan()}
          >
            {loadingPlan() ? 'جاري التحميل...' : 'توليد الخطة'}
          </button>
          <button
            class={`mt-4 flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${
              loadingWebsite() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleGenerateWebsite}
            disabled={loadingWebsite()}
          >
            {loadingWebsite() ? 'جاري التوليد...' : 'توليد الموقع'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuilderForm;