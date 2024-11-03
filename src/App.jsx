import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import Footer from './components/Footer';
import BuilderForm from './components/BuilderForm';
import GeneratedPlan from './components/GeneratedPlan';
import GeneratedWebsite from './components/GeneratedWebsite';

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800 font-cairo" dir="rtl">
      <div class="max-w-7xl mx-auto h-full flex flex-col">
        <Header />
        <Routes>
          <Route path="/" component={BuilderForm} />
          <Route path="/plan" component={GeneratedPlan} />
          <Route path="/website" component={GeneratedWebsite} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;