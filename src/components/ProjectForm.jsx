import { For, Show } from 'solid-js';

function ProjectForm(props) {
  const {
    projectTitle,
    setProjectTitle,
    projectType,
    setProjectType,
    projectSpec,
    setProjectSpec,
    projectGoals,
    setProjectGoals,
    projectAudience,
    setProjectAudience,
    projectBudget,
    setProjectBudget,
    projectTimeline,
    setProjectTimeline,
    projectTechnologies,
    setProjectTechnologies,
    projectTypes,
    loading,
    handleGenerateProject,
  } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل تفاصيل المشروع</h2>
      <div class="space-y-4">
        <input
          type="text"
          value={projectTitle()}
          onInput={(e) => setProjectTitle(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="عنوان المشروع"
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
        <textarea
          value={projectSpec()}
          onInput={(e) => setProjectSpec(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          rows="3"
          placeholder="مواصفات المشروع..."
        ></textarea>
        <textarea
          value={projectGoals()}
          onInput={(e) => setProjectGoals(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          rows="2"
          placeholder="الأهداف..."
        ></textarea>
        <input
          type="text"
          value={projectAudience()}
          onInput={(e) => setProjectAudience(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="الجمهور المستهدف"
        />
        <input
          type="text"
          value={projectBudget()}
          onInput={(e) => setProjectBudget(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="الميزانية المقدرة"
        />
        <input
          type="text"
          value={projectTimeline()}
          onInput={(e) => setProjectTimeline(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          placeholder="الجدول الزمني المتوقع"
        />
        <textarea
          value={projectTechnologies()}
          onInput={(e) => setProjectTechnologies(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          rows="2"
          placeholder="التقنيات المستخدمة..."
        ></textarea>
        <button
          class={`mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
            loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleGenerateProject}
          disabled={loading()}
        >
          <Show when={loading()}>جاري التحميل...</Show>
          <Show when={!loading()}>توليد خطة المشروع</Show>
        </button>
      </div>
    </div>
  );
}

export default ProjectForm;