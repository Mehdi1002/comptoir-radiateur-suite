
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Facture = Tables<'factures'>;
type FactureInsert = TablesInsert<'factures'>;
type LigneFacture = Tables<'lignes_facture'>;
type LigneFactureInsert = TablesInsert<'lignes_facture'>;

export const useFactures = () => {
  return useQuery({
    queryKey: ['factures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('factures')
        .select(`
          *,
          clients (nom, adresse, telephone, email),
          lignes_facture (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFacture = (id: string) => {
  return useQuery({
    queryKey: ['facture', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('factures')
        .select(`
          *,
          clients (*),
          lignes_facture (*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateFacture = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ facture, lignes }: { facture: FactureInsert; lignes: LigneFactureInsert[] }) => {
      // Créer la facture
      const { data: factureData, error: factureError } = await supabase
        .from('factures')
        .insert(facture)
        .select()
        .single();
      
      if (factureError) throw factureError;
      
      // Créer les lignes de facture
      const lignesWithFactureId = lignes.map(ligne => ({
        ...ligne,
        facture_id: factureData.id
      }));
      
      const { error: lignesError } = await supabase
        .from('lignes_facture')
        .insert(lignesWithFactureId);
      
      if (lignesError) throw lignesError;
      
      return factureData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factures'] });
    },
  });
};
