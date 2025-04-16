import SurveyForm from "../components/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 md:py-16">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4">
            Cosmic Fits Survey
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how your personal style connects to your cosmic identity.
            Complete this survey to uncover the unique threads that make up your
            fashion journey.
          </p>
        </header>

        <SurveyForm />

        <footer className="mt-16 text-center text-sm text-gray-500 pb-8">
          <p>© {new Date().getFullYear()} Cosmic Fits. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
