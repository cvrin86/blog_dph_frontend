import React from "react";
import { useRouter } from "next/router"; // Importez useRouter pour récupérer les paramètres de la route
import UpdatePost from "@/components/pages/UpdatePost";

export default function UpdatePage() {
  const router = useRouter();
  const { id } = router.query; // Récupérez l'id de la route dynamique
  console.log(id);
  // Assurez-vous que 'update' existe avant de rendre le contenu
  if (!id) {
    return <p>Chargement...</p>;
  }

  return <UpdatePost idPost={id} />; // Rendre le composant UpdatePost lorsque l'id est disponible
}
