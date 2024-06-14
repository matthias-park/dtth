import Link from "next/link";
import DemonShow from "@/components/demons/demon-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";

interface PostShowPageProps {
  params: {
    url: string;
  };
}

export default async function DemonShowPage({ params }: PostShowPageProps) {
  const { url } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.home()}>
        {"< "}Back to {url}
      </Link>
      <DemonShow url={url}/>
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
