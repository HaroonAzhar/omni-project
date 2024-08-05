import { register, HttpService } from "core/httpClient";

class LtvRequestService extends HttpService {
  getFields() {
    return this.client.get(`ltv/fields`);
  }

  save(data) {
    return this.client.post(`ltv`, data);
  }

  getHistoricals(page = 1) {
    return this.client.get(`ltv/historical?limit=1&page=${page}`);
  }

  getCurrent() {
    return this.client.get(`ltv`);
  }
}

export default register(LtvRequestService);
