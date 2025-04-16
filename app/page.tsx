import SurveyForm from "../components/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
            Cosmic Fits Survey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how your personal style connects to your cosmic identity.
            Complete this survey to uncover the unique threads that make up your
            fashion journey.
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <SurveyForm />
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
          <p>© {new Date().getFullYear()} Cosmic Fits. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
