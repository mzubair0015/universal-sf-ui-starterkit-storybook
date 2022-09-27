/*
 * Singleton Services class
 *
 * Centralized service layer through which all REST API calls will be sent.
 * Eliminates duplicate request
 *
 * Usage example:
 *
 *    import services from "Services";
 *
 *    try {
 *      const result = await services.request("GET", `https://api.github.com/users/test`, {});
 *      console.log(result);
 *      const response = await result.json();
 *     console.log(response);
 *   } catch (ex) {
 *     console.error(ex);
 *  }
 *
 */

class Services {
  constructor() {
    this.promiseCache = {};
    // Time interval for caching one API call
    this.interval = 2000;
  }

  stringCompression(str) {
    if (str.length == 0) {
      console.error("Please enter valid string.");
      return "";
    }
    var output = "";
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      count++;
      if (str[i] != str[i + 1]) {
        output += str[i] + count;
        count = 0;
      }
    }
    return output;
  }

  getHeaders() {
    const token = "__TOKEN__";
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async post(url, payload = true) {
    return this.request("POST", url, payload, this.getHeaders());
  }

  async get(url = true) {
    return this.request("GET", url, null, this.getHeaders());
  }

  async put(url, payload = true) {
    return this.request("PUT", url, payload, this.getHeaders());
  }

  async delete(url = true) {
    return this.request("DELETE", url, null, this.getHeaders());
  }

  async request(type, url, props = null, headers = null) {
    const requestPayload = JSON.stringify(props);
    // const key = this.stringCompression(
    //   `${type}${url}${props ? requestPayload : ""}`
    // );
    const requestBody = props
      ? { method: type, body: requestPayload, headers }
      : { method: type, headers };
    try {
      const promise = new Promise((resolve, reject) => {
        fetch(url, requestBody).then(async (response) => {
          // setTimeout(() => {
          //   delete this.promiseCache[key];
          // }, this.interval);
          try {
            const res = await new Promise((resolve) => {
              return response.json().then((json) => {
                return resolve({
                  status: response.status,
                  ok: response.ok,
                  json,
                });
              });
            });

            if (res.ok) {
              return resolve(res.json);
            }
            return reject(res.json);
          } catch (error) {
            reject({
              networkError: error.message,
            });
          }
        });
      });
      // this.promiseCache[key] = promise;
      return promise;
    } catch (e) {
      console.error(e);
    }
  }

  handleAccessDenied() {
    console.info("Access denied");
  }

  handleUnauthorised() {
    console.info("unauthorized");
  }
}

// create instance and freeze to make it singleton
const services = new Services();
Object.freeze(services);

export default services;
