import SurveyForm from "../components/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cosmic Fits Survey</h1>
        </header>
        <SurveyForm />
      </div>
    </main>
  );
}
