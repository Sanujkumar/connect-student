import React, { useEffect, useState } from "react";
import mountain from "../../asects/image/mountain.jpg";
import { CiHeart, CiShare1 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getAllComment } from "../../service/operations/PostApi";
import { RWebShare } from "react-web-share";
import LikeComponents from "./LikeComponents";
import Comment from "./Comment";

const PostDesign = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [commentData, setCommentData] = useState({});

  const handleComment = async (post_id) => {
    const isVisible = commentsVisibility[post_id];
    setCommentsVisibility((prev) => ({
      ...prev,
      [post_id]: !isVisible,
    }));
  
    if (!isVisible && !commentData[post_id]) {
      try {
        const comments = await getAllComment(token, post_id);
        setCommentData((prev) => ({
          ...prev,
          [post_id]: comments,
        }));
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    }
  };
  

  return (
    <div>
      {data.map((item, index) => (
        <div
          className="flex-row justify-center shadow-sm hover:shadow-2xl p-2 w-full rounded-sm mb-2 bg-white"
          key={index}
        >
          <div className="flex mb-2 border-b p-[0.40rem] mx-4">
            <div className="flex gap-2 w-[75%]">
              <div className="item-center">
                <img
                  src={item.post_by?.image}
                  alt="user_image"
                  className="w-[2.7rem] h-[2.7rem] object-cover place-self-center place-items-center rounded-full"
                />
              </div>
              <div className="flex flex-col gap-y-[0rem] text-[0.9rem] font-[1rem]">
                <p className="font-semibold">{item.post_by?.firstName}</p>
                <p className="text-[0.7rem]">
                  {new Date(item.date).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end place-items-center items-center w-[15%]">
              <p>sit</p>
              <div className="flex gap-x-4 items-center">
                <img
                  src={mountain}
                  className="w-[1.2rem] h-[1.2rem] object-cover place-self-center place-items-center rounded-full"
                  alt=".."
                />
                <HiOutlineDotsHorizontal size={20} />
              </div>
            </div>
          </div>

          <div className="justify-start ml-6">
            <p className="text-sm text-black text-start mb-1">
              {item.description}
            </p>
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=".."
                className="h-[280px] w-full mx-auto rounded-sm m-2 object-cover"
              />
            )}
          </div>

          <div className="flex justify-end gap-x-20 p-2 mt-4 mx-4 items-center">
              <LikeComponents item_id={item._id} isLiked={item.isLiked} total_like={item.total_like_count} />

            <div className="flex gap-2 items-center">
              <button onClick={() => handleComment(item._id)}>
                <BiMessage size={22} />
              </button>
              {item.total_comments}
            </div>

            <p className="flex gap-2 items-center">
              <RWebShare
                data={{
                  text: "Like humans, flamingos make friends for life",
                  url: "https://on.natgeo.com/2zHaNup",
                  title: "Flamingos",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button>
                  <CiShare1 size={18} />
                </button>
              </RWebShare>
              102
            </p>
            <p className="items-center">
              <BsBookmark size={15} />
            </p>
          </div>
          {commentsVisibility[item._id] && (
            <Comment post_id={item._id} comment_data={commentData[item._id] || []} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostDesign;
