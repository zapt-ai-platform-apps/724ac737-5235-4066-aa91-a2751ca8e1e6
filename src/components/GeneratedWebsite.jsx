import { saveAs } from 'file-saver';

function GeneratedWebsite(props) {
  const { generatedWebsite } = props;

  const downloadWebsite = () => {
    const blob = new Blob([generatedWebsite()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'website_code.txt');
  };

  return (
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الموقع المُولد</h2>
      <p class="text-gray-700 mb-4">لقد تم توليد الموقع بناءً على مدخلاتك. يمكنك تنزيل الكود للاطلاع عليه.</p>
      <button
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mb-4"
        onClick={downloadWebsite}
      >
        تنزيل الموقع
      </button>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <code>{generatedWebsite()}</code>
      </pre>
    </div>
  );
}

export default GeneratedWebsite;