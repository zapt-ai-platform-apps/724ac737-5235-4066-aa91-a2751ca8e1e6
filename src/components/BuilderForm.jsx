import { For, Show } from 'solid-js';

function BuilderForm(props) {
  const {
    projectName,
    setProjectName,
    projectField,
    setProjectField,
    projectDescription,
    setProjectDescription,
    selectedFeatures,
    setSelectedFeatures,
    additionalFeatures,
    setAdditionalFeatures,
    projectDesign,
    setProjectDesign,
    projectAudience,
    setProjectAudience,
    projectFields,
    loadingPlan,
    loadingWebsite,
    handleGeneratePlan,
    handleGenerateWebsite,
  } = props;

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
            <Show when={loadingPlan()}>جاري التحميل...</Show>
            <Show when={!loadingPlan()}>توليد الخطة</Show>
          </button>
          <button
            class={`mt-4 flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${
              loadingWebsite() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleGenerateWebsite}
            disabled={loadingWebsite()}
          >
            <Show when={loadingWebsite()}>جاري التوليد...</Show>
            <Show when={!loadingWebsite()}>توليد الموقع</Show>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuilderForm;