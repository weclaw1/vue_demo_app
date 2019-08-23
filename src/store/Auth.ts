import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { BASE_URL } from '../repositories/Repository';
import store from './index';
import jwtDecode from 'jwt-decode';

export interface Token {
  sub: string;
  exp: number;
  admin: boolean;
  id: number;
}

@Module({ dynamic: true, store, namespaced: true, name: 'auth' })
export default class Auth extends VuexModule {
  private _encodedToken?: string = undefined;
  private _token?: Token = undefined;

  get isLoggedIn(): boolean {
    return this._encodedToken !== undefined;
  }

  get isAdmin(): boolean {
    if (this._token === undefined) {
      return false;
    } 
    return this._token.admin;
  }

  get encodedToken(): string | undefined {
    return this._encodedToken;
  }

  get token(): Token | undefined {
    return this._token;
  }

  @Action({rawError: true})
  public async login(auth: { username: string, password: string }) {
    const options = {
      method: 'POST',
      body: JSON.stringify({username: auth.username, password: auth.password}),
      headers: {
          'Content-Type' : 'application/json',
      },
    };

    const res = await fetch(`${BASE_URL}/login`, options);
    if (!res.ok) {
        throw new Error(res.status.toString() + res.statusText);
    }

    const data = await res.json();
    this.setEncodedToken(data.token as string);
    const token = jwtDecode<Token>(data.token!);
    this.setToken(token);
  }

  @Action
  public logout() {
    this.deleteEncodedToken();
    this.deleteToken();
  }

  @Mutation
  private setEncodedToken(encodedToken: string) {
    this._encodedToken = encodedToken;
  }

  @Mutation
  private deleteEncodedToken() {
    this._encodedToken = undefined;
  }

  @Mutation
  private setToken(token: Token) {
    this._token = token;
  }

  @Mutation
  private deleteToken() {
    this._token = undefined;
  }


}
