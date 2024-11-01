import { For, Show } from 'solid-js';

function ProjectForm(props) {
  const {
    projectTitle,
    setProjectTitle,
    projectType,
    setProjectType,
    projectSpec,
    setProjectSpec,
    projectTypes,
    loading,
    handleGenerateProject,
  } = props;

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">ادخل عنوان ونوع ومواصفات المشروع</h2>
      <input
        type="text"
        value={projectTitle()}
        onInput={(e) => setProjectTitle(e.target.value)}
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        placeholder="عنوان المشروع"
      />
      <select
        value={projectType()}
        onChange={(e) => setProjectType(e.target.value)}
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
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
        rows="5"
        placeholder="مواصفات المشروع..."
      ></textarea>
      <button
        class={`mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleGenerateProject}
        disabled={loading()}
      >
        <Show when={loading()}>جاري التحميل...</Show>
        <Show when={!loading()}>توليد المشروع</Show>
      </button>
    </div>
  );
}

export default ProjectForm;