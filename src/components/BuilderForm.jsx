import { For, Show } from 'solid-js';

function BuilderForm(props) {
  const {
    projectName,
    setProjectName,
    projectType,
    setProjectType,
    projectField,
    setProjectField,
    projectDescription,
    setProjectDescription,
    projectFeatures,
    setProjectFeatures,
    projectPlatforms,
    setProjectPlatforms,
    projectDesign,
    setProjectDesign,
    projectAudience,
    setProjectAudience,
    projectTypes,
    projectFields,
    loading,
    handleGeneratePlan,
  } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل تفاصيل المشروع</h2>
      <div class="space-y-4">
        <input
          type="text"
          value={projectName()}
          onInput={(e) => setProjectName(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="اسم المشروع"
        />
        <select
          value={projectType()}
          onChange={(e) => setProjectType(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
        >
          <For each={projectTypes}>
            {(type) => (
              <option value={type.value} disabled={type.value === ''}>
                {type.label}
              </option>
            )}
          </For>
        </select>
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
          placeholder="وصف المشروع..."
        ></textarea>
        <textarea
          value={projectFeatures()}
          onInput={(e) => setProjectFeatures(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          rows="2"
          placeholder="الميزات المطلوبة..."
        ></textarea>
        <input
          type="text"
          value={projectPlatforms()}
          onInput={(e) => setProjectPlatforms(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="منصة الاستهداف (مثال: Android، iOS، الويب)"
        />
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
        <button
          class={`mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
            loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleGeneratePlan}
          disabled={loading()}
        >
          <Show when={loading()}>جاري التحميل...</Show>
          <Show when={!loading()}>توليد الموقع/التطبيق</Show>
        </button>
      </div>
    </div>
  );
}

export default BuilderForm;