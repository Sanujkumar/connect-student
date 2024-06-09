import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postComment, getAllComment } from "../../service/operations/PostApi";
import { Skeleton } from "../../components/ui/skeleton";

const Comment = ({ post_id }) => {
  const [desc, setDesc] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const comment_data = await getAllComment(token, post_id);
        setCommentData(comment_data);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [post_id, token]);

  const handleChanges = (e) => {
    setDesc(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await postComment(token, post_id, desc);
      setCommentData([res, ...commentData]);
      setDesc("");
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  return (
    <div className="mt-2">
      <div>
        <form className="flex justify-center" onSubmit={handlePost}>
          <input
            name="user_comment"
            placeholder="Enter your comment"
            value={desc}
            onChange={handleChanges}
            className="w-[80%] m-2 p-2 border rounded-md font-mono border-b outline-none"
          />
          <button
            type="submit"
            className="bg-gray-100 text-black text-sm w-[10%] m-2 rounded font-semibold hover:bg-slate-200"
          >
            Post
          </button>
        </form>
      </div>
      <div className="">
        {loading ? (
          <div>
            <div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-4 rounded-full" />
              <Skeleton className="w-24 h-4 rounded-full" />
            </div>
          </div>
        ) : (
          commentData.map((item, index) => (
            <div key={index} className="  hover:bg-neutral-100 border-t">
            <div className="flex gap-x-3 ml-4 mr-2 p-2 ">
              <img
                src={item?.user?.image}
                className="w-[2rem] h-[2rem] border object-cover place-self-center place-items-center rounded-full"
                alt="user"
              />
              <p>{item?.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
