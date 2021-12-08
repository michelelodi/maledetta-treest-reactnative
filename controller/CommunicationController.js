import axios from "axios";

export default class CommunicationController {
  instance = axios.create({
    baseURL: "https://ewserver.di.unimi.it/mobicomp/treest",
  });

  async baseRequest(url, body) {
    console.log("Handling " + url);

    let res = await this.instance.post(url + ".php", body);
    if (res.status === 200) return res["data"];
    else return res.status;
  }

  async addPost(body) {
    return await this.baseRequest("addPost", body);
  }

  async getLines(body, responseHandler) {
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
      responseHandler(lines);
    } else throw new Error("An error occurred. HTTP status: " + res);
  }

  async getPosts(body, responseHandler) {
    let res = await this.baseRequest("getPosts", body);
    responseHandler(res["posts"]);
  }

  async getProfile(body, responseHandler) {
    let res = await this.baseRequest("getProfile", body);
    responseHandler(res);
  }

  async getStations(body, responseHandler) {
    let res = await this.baseRequest("getStations", body);
    responseHandler(res);
  }

  async register(responseHandler) {
    let res = await this.baseRequest("register", {});
    responseHandler(res["sid"]);
  }

  async setProfile(body) {
    return await this.baseRequest("setProfile", body);
  }
}
