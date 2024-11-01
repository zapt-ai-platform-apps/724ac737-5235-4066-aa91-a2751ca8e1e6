import { SolidMarkdown } from 'solid-markdown';

function GeneratedPlan(props) {
  const { generatedPlan } = props;

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الخطة المقترحة</h2>
      <SolidMarkdown class="text-gray-700" children={generatedPlan()} />
    </div>
  );
}

export default GeneratedPlan;