import SurveyForm from "../components/SurveyForm";

export default function Home() {
  return (
    <main>
      <div className="content">
        <SurveyForm />
      </div>

      <footer>
        <p>
          © {new Date().getFullYear()} <i>this is bullish</i>. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
