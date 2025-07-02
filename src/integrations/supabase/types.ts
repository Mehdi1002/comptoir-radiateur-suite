export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: string
          nom: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nom: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          adresse: string | null
          created_at: string | null
          email: string | null
          id: string
          nic: string | null
          nif: string | null
          nom: string
          rc: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nic?: string | null
          nif?: string | null
          nom: string
          rc?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nic?: string | null
          nif?: string | null
          nom?: string
          rc?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      factures: {
        Row: {
          client_id: string | null
          conditions_paiement: string | null
          created_at: string | null
          date_echeance: string | null
          date_emission: string | null
          id: string
          inclure_droits_timbre: boolean | null
          mode_paiement: string | null
          montant_tva: number
          notes: string | null
          numero_facture: string
          remise_globale: number | null
          sous_total: number
          statut: string
          total_ht: number
          total_ttc: number
          tva_taux: number
          type_document: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          conditions_paiement?: string | null
          created_at?: string | null
          date_echeance?: string | null
          date_emission?: string | null
          id?: string
          inclure_droits_timbre?: boolean | null
          mode_paiement?: string | null
          montant_tva?: number
          notes?: string | null
          numero_facture: string
          remise_globale?: number | null
          sous_total?: number
          statut?: string
          total_ht?: number
          total_ttc?: number
          tva_taux?: number
          type_document: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          conditions_paiement?: string | null
          created_at?: string | null
          date_echeance?: string | null
          date_emission?: string | null
          id?: string
          inclure_droits_timbre?: boolean | null
          mode_paiement?: string | null
          montant_tva?: number
          notes?: string | null
          numero_facture?: string
          remise_globale?: number | null
          sous_total?: number
          statut?: string
          total_ht?: number
          total_ttc?: number
          tva_taux?: number
          type_document?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "factures_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      lignes_facture: {
        Row: {
          created_at: string | null
          designation: string
          facture_id: string | null
          id: string
          prix_unitaire: number
          produit_id: string | null
          quantite: number
          remise_pourcentage: number | null
          total_ligne: number
        }
        Insert: {
          created_at?: string | null
          designation: string
          facture_id?: string | null
          id?: string
          prix_unitaire: number
          produit_id?: string | null
          quantite: number
          remise_pourcentage?: number | null
          total_ligne: number
        }
        Update: {
          created_at?: string | null
          designation?: string
          facture_id?: string | null
          id?: string
          prix_unitaire?: number
          produit_id?: string | null
          quantite?: number
          remise_pourcentage?: number | null
          total_ligne?: number
        }
        Relationships: [
          {
            foreignKeyName: "lignes_facture_facture_id_fkey"
            columns: ["facture_id"]
            isOneToOne: false
            referencedRelation: "factures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lignes_facture_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
        ]
      }
      mouvements_stock: {
        Row: {
          commentaire: string | null
          date_mouvement: string | null
          id: string
          produit_id: string | null
          quantite: number
          reference_document: string | null
          type_mouvement: string
        }
        Insert: {
          commentaire?: string | null
          date_mouvement?: string | null
          id?: string
          produit_id?: string | null
          quantite: number
          reference_document?: string | null
          type_mouvement: string
        }
        Update: {
          commentaire?: string | null
          date_mouvement?: string | null
          id?: string
          produit_id?: string | null
          quantite?: number
          reference_document?: string | null
          type_mouvement?: string
        }
        Relationships: [
          {
            foreignKeyName: "mouvements_stock_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
        ]
      }
      paiements: {
        Row: {
          created_at: string | null
          date_paiement: string | null
          facture_id: string | null
          id: string
          mode_paiement: string
          montant: number
          notes: string | null
          reference_paiement: string | null
        }
        Insert: {
          created_at?: string | null
          date_paiement?: string | null
          facture_id?: string | null
          id?: string
          mode_paiement: string
          montant: number
          notes?: string | null
          reference_paiement?: string | null
        }
        Update: {
          created_at?: string | null
          date_paiement?: string | null
          facture_id?: string | null
          id?: string
          mode_paiement?: string
          montant?: number
          notes?: string | null
          reference_paiement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_facture_id_fkey"
            columns: ["facture_id"]
            isOneToOne: false
            referencedRelation: "factures"
            referencedColumns: ["id"]
          },
        ]
      }
      produits: {
        Row: {
          categorie_id: string | null
          date_ajout: string | null
          description: string | null
          fournisseur: string | null
          id: string
          nom: string
          prix_unitaire: number
          quantite_en_stock: number
          reference: string
          seuil_alerte: number
          updated_at: string | null
        }
        Insert: {
          categorie_id?: string | null
          date_ajout?: string | null
          description?: string | null
          fournisseur?: string | null
          id?: string
          nom: string
          prix_unitaire?: number
          quantite_en_stock?: number
          reference: string
          seuil_alerte?: number
          updated_at?: string | null
        }
        Update: {
          categorie_id?: string | null
          date_ajout?: string | null
          description?: string | null
          fournisseur?: string | null
          id?: string
          nom?: string
          prix_unitaire?: number
          quantite_en_stock?: number
          reference?: string
          seuil_alerte?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produits_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profil_entreprise: {
        Row: {
          activite_principale: string | null
          adresse: string | null
          cb_bna: string | null
          created_at: string | null
          email: string | null
          id: string
          logo_url: string | null
          n_article: string | null
          nic: string | null
          nif: string | null
          nom_commercial: string
          rc: string | null
          signature_cachet_url: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          activite_principale?: string | null
          adresse?: string | null
          cb_bna?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          n_article?: string | null
          nic?: string | null
          nif?: string | null
          nom_commercial: string
          rc?: string | null
          signature_cachet_url?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          activite_principale?: string | null
          adresse?: string | null
          cb_bna?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          n_article?: string | null
          nic?: string | null
          nif?: string | null
          nom_commercial?: string
          rc?: string | null
          signature_cachet_url?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_numero_facture: {
        Args: { type_doc: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
