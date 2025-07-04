
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Package, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comptoir Radiateur Suite
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Système de gestion pour votre entreprise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Facturation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Créez et gérez vos factures, devis et bons de commande
              </p>
              <Link to="/facturation">
                <Button className="w-full">
                  Accéder
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Clients</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Gérez votre base de données clients
              </p>
              <Button variant="outline" className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Stock</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Suivez vos produits et votre inventaire
              </p>
              <Button variant="outline" className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Reporting</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Analysez vos performances commerciales
              </p>
              <Button variant="outline" className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fonctionnalités de Facturation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ Création de factures</h3>
              <p className="text-gray-600 text-sm">Interface intuitive pour créer rapidement vos factures</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ Génération PDF</h3>
              <p className="text-gray-600 text-sm">Téléchargez vos factures au format PDF professionnel</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">✓ Gestion des clients</h3>
              <p className="text-gray-600 text-sm">Base de données complète de vos clients</p>
            </div>
            <div>
              <h3 className="font-semibant text-gray-800 mb-2">✓ Calculs automatiques</h3>
              <p className="text-gray-600 text-sm">TVA, remises et totaux calculés automatiquement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
