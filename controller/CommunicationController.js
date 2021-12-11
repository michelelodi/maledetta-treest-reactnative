import axios from "axios";

export default class CommunicationController {
  instance = axios.create({
    baseURL: "https://ewserver.di.unimi.it/mobicomp/treest",
  });

  async baseRequest(url, body) {
    console.log("Handling " + url);

    let res = await this.instance.post(url + ".php", body);
    switch (res.status) {
      case 200:
        return res["data"];
      case 400:
        throw new Error("HTTP error code 400: Invalid parameters");
      case 401:
        throw new Error("HTTP error code 401: Invalid session id");
      case 200:
        throw new Error("HTTP error code 413: parameters has too long data");
      default:
        throw new Error("An error occurred. HTTP status: " + res.status);
    }
  }

  async addPost(body) {
    return await this.baseRequest("addPost", body);
  }

  async follow(body) {
    return await this.baseRequest("follow", body);
  }

  async getLines(body) {
    let res = await this.baseRequest("getLines", body);
    let lines = [];
    if (res["lines"]) {
      res["lines"].map((item) => {
        let lname = item.terminus1.sname + " - " + item.terminus2.sname;
        lines.push({
          data: [
            {
              lname: lname,
              sname: item.terminus1.sname,
              did: item.terminus1.did,
              reverseSname: item.terminus2.sname,
              reverseDid: item.terminus2.did,
            },
            {
              lname: lname,
              sname: item.terminus2.sname,
              did: item.terminus2.did,
              reverseSname: item.terminus1.sname,
              reverseDid: item.terminus1.did,
            },
          ],
        });
      });
      return lines;
    }
  }

  async getPosts(body) {
    let res = await this.baseRequest("getPosts", body);
    res["posts"].map((el, i) => {
      res["posts"][i] = { ...el, upicture: "null" };
    });
    return res["posts"];
  }

  async getProfile(body) {
    return await this.baseRequest("getProfile", body);
  }

  async getStations(body) {
    return await this.baseRequest("getStations", body);
  }

  async getUserPicture(body) {
    return await this.baseRequest("getUserPicture", body);
  }

  async register() {
    let res = await this.baseRequest("register", {});
    return res["sid"];
  }

  async setProfile(body) {
    return await this.baseRequest("setProfile", body);
  }

  async unfollow(body) {
    return await this.baseRequest("unfollow", body);
  }
}
