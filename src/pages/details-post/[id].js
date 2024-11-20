import { useRouter } from "next/router";
import PostPage from "@/components/pages/PostPage"; // Assurez-vous que le chemin est correct

const id = () => {
    const router = useRouter();
    const { id } = router.query; // Récupère l'ID du post à partir de l'URL

    return (
        <div>
            {/* Passer l'id au composant PostPage */}
            {id ? <PostPage idPost={id} /> : <p>Chargement du post...</p>}
        </div>
    );
};

export default id;

