import { useState } from "react";
import {useSelector } from "react-redux";
import { postComment } from "../../service/operations/PostApi";



const Comment = ({ post_id, comment_data }) => {
    const [desc, setDesc] = useState("");
    const [commentData, setCommentData] = useState();
    const token = useSelector((state) => state.auth.token);
    
  
    const handleChanges = (e) => {
    
      setDesc(e.target.value);
    };
  
    const handlePost = async (e) => {
      e.preventDefault();
      const resp = await postComment(token, post_id, desc);
      console.log("this is the comments",resp.content)
    //   if (resp.success) {
        setCommentData( resp.content);
         // Clear the input after posting the comment
    //   }
      setDesc("");
    };
  
    // Test the comment data
    console.log("This is the new post comment", commentData);
  
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
        <div className="bg-neutral-200">
          {commentData?.map((item, index) => (
            <div key={index} className="flex gap-x-3 m-3">
              <img
                src={item?.user?.image}
                className="w-[1rem] h-[1rem] object-cover place-self-center place-items-center rounded-full"
                alt="user"
              />
              <p>{item?.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Comment;