import React, { useContext } from "react";
import CommunicationController from "./controller/CommunicationController";
import { AppDataContext } from "./AppContext";
import { TextInput, View, Button } from "react-native";

export default function AddPostScreen({ navigation }) {
  let { sid, line } = useContext(AppDataContext);
  let data = {
    sid: sid,
    did: line.did,
    delay: null,
    status: null,
    comment: null,
  };

  function postIsValid(post) {
    if (post.delay || post.status || post.comment) {
      if ((post.delay && parseInt(post.delay) < 0) || parseInt(post.delay) > 3)
        return "Invalid delay";
      else if (
        (post.status && parseInt(post.status) < 0) ||
        parseInt(post.status) > 3
      )
        return "Invalid status";
      else if (
        (post.comment && post.comment.length == 0) ||
        post.comment.length > 100
      )
        return "Invalid comment";
      return true;
    } else console.log("Empty request");
  }

  return (
    <View>
      <TextInput
        placeholder="delay"
        onChangeText={(value) => (data.delay = value)}
      ></TextInput>
      <TextInput
        placeholder="status"
        onChangeText={(value) => (data.status = value)}
      ></TextInput>
      <TextInput
        placeholder="comment"
        onChangeText={(value) => (data.comment = value)}
      ></TextInput>
      <Button
        title="ADD"
        onPress={() => {
          postIsValid(data) === true
            ? new CommunicationController()
                .addPost(data)
                .then(navigation.goBack())
                .catch((error) => console.log(error))
            : console.log(postIsValid(data));
        }}
      />
    </View>
  );
}
