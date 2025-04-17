import SurveyForm from "../components/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="content">
        <SurveyForm />

        <footer className="mt-12 text-center text-xs text-gray-500 pb-8">
          <p>
            © {new Date().getFullYear()} <i>this is bullish</i>. All rights
            reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
