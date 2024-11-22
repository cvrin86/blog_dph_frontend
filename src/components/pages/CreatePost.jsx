import PostForm from "../commons/PostForm"
import { useRouter } from "next/router";

const CreatePostPage = () => {
  const router = useRouter();

  return (
    <PostForm
      isEditing={false}
      onSuccess={() => {
        alert("Post créé avec succès !");
        router.push("/dashboard"); // Redirection après création
      }}
    />
  );
};

export default CreatePostPage;
