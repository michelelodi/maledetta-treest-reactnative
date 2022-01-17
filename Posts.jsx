import React, { useState, useContext } from "react";
import { FlatList } from "react-native";
import { AppDataContext } from "./AppContext";
import CommunicationController from "./controller/CommunicationController";
import Post from "./Post";

export default function Posts({ data }) {
  let { sid, _ } = useContext(AppDataContext);
  let cc = new CommunicationController();
  let [follow, setFollow] = useState(initFollow());

  function initFollow() {
    return Object.fromEntries(
      data.map((el) => {
        return [el["author"], el["followingAuthor"]];
      })
    );
  }

  let revertFollow = (item) => {
    if (follow[item["author"]]) {
      cc.unfollow({ sid: sid, uid: item["author"] })
        .then(() => {
          let revertFollow = { ...follow };
          revertFollow[item["author"]] = !revertFollow[item["author"]];
          setFollow(revertFollow);
        })
        .catch((e) => console.log(e));
    } else {
      cc.follow({ sid: sid, uid: item["author"] })
        .then(() => {
          let revertFollow = { ...follow };
          revertFollow[item["author"]] = !revertFollow[item["author"]];
          setFollow(revertFollow);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <Post
            item={item}
            follow={follow}
            revertFollow={(item) => revertFollow(item)}
          />
        );
      }}
      keyExtractor={(_, i) => i}
    />
  );
}
