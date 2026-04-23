import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useRealtimeSync() {
  const qc = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Suscribirse a todos los cambios (INSERT, UPDATE, DELETE) en el schema public
    const channel = supabase.channel("global-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        () => {
          // Invalidar todas las consultas de React Query para refetch en tiempo real
          qc.invalidateQueries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
}
