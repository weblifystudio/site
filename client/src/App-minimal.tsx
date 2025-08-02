import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Weblify Studio</h1>
      <p className="text-gray-600 mb-8">Site web professionnel en cours de chargement...</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Systèmes opérationnels</h2>
          <ul className="text-green-700 space-y-1">
            <li>• Serveur Express sécurisé</li>
            <li>• Email SMTP vers contact@weblifystudio.fr</li>
            <li>• Newsletter Mailchimp intégrée</li>
            <li>• Base de données PostgreSQL</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">🔧 En cours de finalisation</h2>
          <p className="text-blue-700">Interface utilisateur React en cours d'optimisation...</p>
        </div>
      </div>
    </div>
  );
}

export default App;