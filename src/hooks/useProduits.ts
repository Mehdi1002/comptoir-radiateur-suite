
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useProduits = () => {
  return useQuery({
    queryKey: ['produits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .order('nom');
      
      if (error) throw error;
      return data;
    },
  });
};
