'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#003f87] to-[#004fa3]">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-[#003f87]">🇨🇩 Congo Admin</div>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button variant="outline">Connexion</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-[#003f87] hover:bg-[#004fa3]">Inscription</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Services Administratifs en Ligne
          </h1>
          <p className="text-xl mb-8 text-gray-100">
            Effectuez vos démarches administratives de manière simple, sécurisée et rapide
          </p>
          
          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-left hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Passeport</h3>
              <p className="text-sm text-gray-200">Demandez votre passeport en ligne</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-left hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-xl font-semibold mb-2">Carte de Séjour</h3>
              <p className="text-sm text-gray-200">Obtenez votre carte de séjour</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-left hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Déclaration</h3>
              <p className="text-sm text-gray-200">Faites votre déclaration d'arrivée</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button className="bg-white text-[#003f87] hover:bg-gray-100 px-8 py-3 text-lg">
                Commencer
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#003f87] px-8 py-3 text-lg">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003f87]">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#003f87]">Simple et Rapide</h3>
                <p className="text-gray-600">Complétez vos demandes en quelques minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#003f87]">Sécurisé</h3>
                <p className="text-gray-600">Vos données sont protégées par les dernières technologies</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#003f87]">Accessible</h3>
                <p className="text-gray-600">Accédez depuis votre téléphone, tablette ou ordinateur</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🔔</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#003f87]">Suivi en Temps Réel</h3>
                <p className="text-gray-600">Recevez des notifications à chaque étape</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003f87] text-white py-8 px-8 text-center">
        <p>&copy; 2024 Plateforme de Services Administratifs - République du Congo</p>
      </footer>
    </main>
  )
}
