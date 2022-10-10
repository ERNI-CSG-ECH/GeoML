import { environment } from "src/environments/environment";

export class AppSettings {
  public static API_ENDPOINT = environment.production ? '/api' : 'http://www.localhost:4000/api';
}
