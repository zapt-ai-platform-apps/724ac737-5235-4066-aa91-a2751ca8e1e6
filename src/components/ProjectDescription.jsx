import { SolidMarkdown } from 'solid-markdown';

function ProjectDescription(props) {
  const { generatedProject } = props;

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">وصف المشروع</h2>
      <SolidMarkdown class="text-gray-700" children={generatedProject()} />
    </div>
  );
}

export default ProjectDescription;