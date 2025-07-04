
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { useProduits } from '@/hooks/useProduits';
import { useCreateFacture } from '@/hooks/useFactures';
import { toast } from 'sonner';

interface CreateFactureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LigneFacture {
  designation: string;
  quantite: number;
  prix_unitaire: number;
  remise_pourcentage: number;
  total_ligne: number;
}

export const CreateFactureDialog = ({ open, onOpenChange }: CreateFactureDialogProps) => {
  const { data: clients } = useClients();
  const { data: produits } = useProduits();
  const createFacture = useCreateFacture();

  const [formData, setFormData] = useState({
    client_id: '',
    type_document: 'facture',
    date_emission: new Date().toISOString().split('T')[0],
    date_echeance: '',
    tva_taux: 19,
    remise_globale: 0,
    notes: '',
    conditions_paiement: '',
    mode_paiement: 'virement',
  });

  const [lignes, setLignes] = useState<LigneFacture[]>([
    { designation: '', quantite: 1, prix_unitaire: 0, remise_pourcentage: 0, total_ligne: 0 }
  ]);

  const calculerTotalLigne = (ligne: LigneFacture) => {
    const montantBase = ligne.quantite * ligne.prix_unitaire;
    const remise = montantBase * (ligne.remise_pourcentage / 100);
    return montantBase - remise;
  };

  const updateLigne = (index: number, field: keyof LigneFacture, value: number | string) => {
    const newLignes = [...lignes];
    newLignes[index] = { ...newLignes[index], [field]: value };
    newLignes[index].total_ligne = calculerTotalLigne(newLignes[index]);
    setLignes(newLignes);
  };

  const ajouterLigne = () => {
    setLignes([...lignes, { designation: '', quantite: 1, prix_unitaire: 0, remise_pourcentage: 0, total_ligne: 0 }]);
  };

  const supprimerLigne = (index: number) => {
    if (lignes.length > 1) {
      setLignes(lignes.filter((_, i) => i !== index));
    }
  };

  const calculerTotaux = () => {
    const sousTotal = lignes.reduce((sum, ligne) => sum + ligne.total_ligne, 0);
    const remiseGlobale = sousTotal * (formData.remise_globale / 100);
    const totalHT = sousTotal - remiseGlobale;
    const montantTVA = totalHT * (formData.tva_taux / 100);
    const totalTTC = totalHT + montantTVA;

    return { sousTotal, totalHT, montantTVA, totalTTC };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_id) {
      toast.error('Veuillez sélectionner un client');
      return;
    }

    const totaux = calculerTotaux();

    try {
      await createFacture.mutateAsync({
        facture: {
          ...formData,
          sous_total: totaux.sousTotal,
          total_ht: totaux.totalHT,
          montant_tva: totaux.montantTVA,
          total_ttc: totaux.totalTTC,
          statut: 'brouillon',
        },
        lignes: lignes.map(ligne => ({
          designation: ligne.designation,
          quantite: ligne.quantite,
          prix_unitaire: ligne.prix_unitaire,
          remise_pourcentage: ligne.remise_pourcentage,
          total_ligne: ligne.total_ligne,
        }))
      });

      toast.success('Facture créée avec succès');
      onOpenChange(false);
      
      // Reset form
      setFormData({
        client_id: '',
        type_document: 'facture',
        date_emission: new Date().toISOString().split('T')[0],
        date_echeance: '',
        tva_taux: 19,
        remise_globale: 0,
        notes: '',
        conditions_paiement: '',
        mode_paiement: 'virement',
      });
      setLignes([{ designation: '', quantite: 1, prix_unitaire: 0, remise_pourcentage: 0, total_ligne: 0 }]);
    } catch (error) {
      console.error('Erreur création facture:', error);
      toast.error('Erreur lors de la création de la facture');
    }
  };

  const totaux = calculerTotaux();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle facture</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client *</Label>
              <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type_document">Type de document</Label>
              <Select value={formData.type_document} onValueChange={(value) => setFormData({...formData, type_document: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facture">Facture</SelectItem>
                  <SelectItem value="devis">Devis</SelectItem>
                  <SelectItem value="bon">Bon de commande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date_emission">Date d'émission</Label>
              <Input
                type="date"
                value={formData.date_emission}
                onChange={(e) => setFormData({...formData, date_emission: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="date_echeance">Date d'échéance</Label>
              <Input
                type="date"
                value={formData.date_echeance}
                onChange={(e) => setFormData({...formData, date_echeance: e.target.value})}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Lignes de facturation
                <Button type="button" onClick={ajouterLigne} size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Ajouter une ligne
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lignes.map((ligne, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 bg-gray-50 rounded-lg">
                  <div className="md:col-span-2">
                    <Label>Désignation</Label>
                    <Input
                      value={ligne.designation}
                      onChange={(e) => updateLigne(index, 'designation', e.target.value)}
                      placeholder="Produit ou service"
                    />
                  </div>
                  <div>
                    <Label>Quantité</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ligne.quantite}
                      onChange={(e) => updateLigne(index, 'quantite', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>Prix unitaire</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ligne.prix_unitaire}
                      onChange={(e) => updateLigne(index, 'prix_unitaire', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>Remise %</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={ligne.remise_pourcentage}
                      onChange={(e) => updateLigne(index, 'remise_pourcentage', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div>
                      <Label>Total</Label>
                      <Input
                        value={ligne.total_ligne.toFixed(2)}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    {lignes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => supprimerLigne(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Notes additionnelles..."
                />
              </div>
              <div>
                <Label htmlFor="conditions_paiement">Conditions de paiement</Label>
                <Input
                  value={formData.conditions_paiement}
                  onChange={(e) => setFormData({...formData, conditions_paiement: e.target.value})}
                  placeholder="Ex: Paiement à 30 jours"
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Totaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{totaux.sousTotal.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label>TVA %:</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tva_taux}
                    onChange={(e) => setFormData({...formData, tva_taux: parseFloat(e.target.value) || 0})}
                    className="w-20"
                  />
                  <span>{totaux.montantTVA.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total TTC:</span>
                  <span>{totaux.totalTTC.toFixed(2)} €</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={createFacture.isPending}>
              {createFacture.isPending ? 'Création...' : 'Créer la facture'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
