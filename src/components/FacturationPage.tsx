
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, FileText, Euro } from 'lucide-react';
import { useFactures } from '@/hooks/useFactures';
import { CreateFactureDialog } from './CreateFactureDialog';
import { FacturePDF } from './FacturePDF';

const FacturationPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState<string | null>(null);
  const { data: factures, isLoading } = useFactures();

  const handleViewFacture = (factureId: string) => {
    setSelectedFactureId(factureId);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Facture
        </Button>
      </div>

      <div className="grid gap-6">
        {factures?.map((facture) => (
          <Card key={facture.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {facture.numero_facture}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewFacture(facture.id)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    Voir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Client</p>
                  <p className="font-medium">{facture.clients?.nom || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date d'émission</p>
                  <p className="font-medium">
                    {facture.date_emission ? new Date(facture.date_emission).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant TTC</p>
                  <p className="font-medium flex items-center">
                    <Euro className="mr-1 h-4 w-4" />
                    {facture.total_ttc.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  facture.statut === 'payee' 
                    ? 'bg-green-100 text-green-800'
                    : facture.statut === 'envoyee'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {facture.statut.charAt(0).toUpperCase() + facture.statut.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateFactureDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />

      {selectedFactureId && (
        <FacturePDF 
          factureId={selectedFactureId}
          onClose={() => setSelectedFactureId(null)}
        />
      )}
    </div>
  );
};

export default FacturationPage;
