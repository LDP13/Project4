import React from 'react';
import { ChefHat } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">Recherche de Recettes</h1>
        </div>
      </div>
    </header>
  );
}