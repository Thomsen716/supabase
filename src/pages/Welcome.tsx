function Welcome() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Hovedoverskrift */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Velkommen til Vores Side
        </h1>

        {/* Underoverskrift */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Vi skaber fantastiske oplevelser online
        </h2>

        {/* Brødtekst */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Uanset om du leder efter inspiration, tips eller løsninger, er du
          kommet til det rette sted. Vores mission er at levere kvalitet og
          værdi gennem design, teknologi og innovation.
        </p>

        {/* Call-to-action */}
        <div className="mt-8">
          <a
            href="#services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Læs mere
          </a>
        </div>
      </div>
    </section>
  );
}
export default Welcome;
