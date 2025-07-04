
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { useFacture } from '@/hooks/useFactures';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FacturePDFProps {
  factureId: string;
  onClose: () => void;
}

export const FacturePDF = ({ factureId, onClose }: FacturePDFProps) => {
  const { data: facture, isLoading } = useFacture(factureId);
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!contentRef.current || !facture) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${facture.numero_facture}.pdf`);
    } catch (error) {
      console.error('Erreur génération PDF:', error);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <div>Chargement...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!facture) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Facture {facture.numero_facture}</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={generatePDF} size="sm">
                <Download className="mr-1 h-4 w-4" />
                Télécharger PDF
              </Button>
              <Button variant="outline" onClick={onClose} size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="bg-white p-8 space-y-6">
          {/* En-tête de la facture */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Comptoir Radiateur Suite</h1>
              <div className="mt-4 text-sm text-gray-600">
                <p>123 Rue de l'Industrie</p>
                <p>75000 Paris, France</p>
                <p>Tél: +33 1 23 45 67 89</p>
                <p>Email: contact@comptoirradiateur.fr</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">
                {facture.type_document.toUpperCase()} N° {facture.numero_facture}
              </h2>
              <div className="mt-4 text-sm">
                <p><strong>Date d'émission:</strong> {new Date(facture.date_emission || '').toLocaleDateString('fr-FR')}</p>
                {facture.date_echeance && (
                  <p><strong>Date d'échéance:</strong> {new Date(facture.date_echeance).toLocaleDateString('fr-FR')}</p>
                )}
                <p><strong>Statut:</strong> <span className="capitalize">{facture.statut}</span></p>
              </div>
            </div>
          </div>

          {/* Informations client */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Facturé à:</h3>
            <div className="text-sm">
              <p className="font-semibold">{facture.clients?.nom}</p>
              {facture.clients?.adresse && <p>{facture.clients.adresse}</p>}
              {facture.clients?.telephone && <p>Tél: {facture.clients.telephone}</p>}
              {facture.clients?.email && <p>Email: {facture.clients.email}</p>}
              {facture.clients?.nif && <p>NIF: {facture.clients.nif}</p>}
            </div>
          </div>

          {/* Tableau des lignes */}
          <div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 p-3 text-left">Désignation</th>
                  <th className="border border-gray-300 p-3 text-right">Qté</th>
                  <th className="border border-gray-300 p-3 text-right">Prix Unit.</th>
                  <th className="border border-gray-300 p-3 text-right">Remise %</th>
                  <th className="border border-gray-300 p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {facture.lignes_facture?.map((ligne, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">{ligne.designation}</td>
                    <td className="border border-gray-300 p-3 text-right">{ligne.quantite}</td>
                    <td className="border border-gray-300 p-3 text-right">{ligne.prix_unitaire.toFixed(2)} €</td>
                    <td className="border border-gray-300 p-3 text-right">{ligne.remise_pourcentage || 0}%</td>
                    <td className="border border-gray-300 p-3 text-right font-semibold">{ligne.total_ligne.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{facture.sous_total.toFixed(2)} €</span>
                </div>
                {facture.remise_globale && facture.remise_globale > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Remise globale ({facture.remise_globale}%):</span>
                    <span>-{(facture.sous_total * facture.remise_globale / 100).toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Total HT:</span>
                  <span>{facture.total_ht.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA ({facture.tva_taux}%):</span>
                  <span>{facture.montant_tva.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total TTC:</span>
                  <span>{facture.total_ttc.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          {(facture.conditions_paiement || facture.notes) && (
            <div className="space-y-4">
              {facture.conditions_paiement && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Conditions de paiement:</h3>
                  <p className="text-sm text-gray-600">{facture.conditions_paiement}</p>
                </div>
              )}
              {facture.notes && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Notes:</h3>
                  <p className="text-sm text-gray-600">{facture.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Pied de page */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Comptoir Radiateur Suite - Système de gestion commercial</p>
            <p>Merci de votre confiance !</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
