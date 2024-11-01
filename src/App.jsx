import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import BuilderForm from './components/BuilderForm';
import GeneratedPlan from './components/GeneratedPlan';
import GeneratedWebsite from './components/GeneratedWebsite';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800" dir="rtl">
      <div class="max-w-6xl mx-auto h-full flex flex-col">
        <Header />
        <Routes>
          <Route path="/" component={BuilderForm} />
          <Route path="/plan" component={GeneratedPlan} />
          <Route path="/website" component={GeneratedWebsite} />
        </Routes>
      </div>
    </div>
  );
}

export default App;