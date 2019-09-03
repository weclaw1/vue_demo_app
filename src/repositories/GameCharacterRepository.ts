import { Repository, BASE_URL } from './Repository';
import { GameCharacter } from '../entities/GameCharacter';

import { getModule } from 'vuex-module-decorators';
import Auth from '../store/Auth';

export class GameCharacterRepository implements Repository<GameCharacter> {
    private readonly resource: string; 
    private auth: Auth = getModule(Auth);

    constructor(private readonly userId: number) {
        this.resource = `/users/${userId}/characters`;
    }

    public async getAll(): Promise<GameCharacter[]> {
        const res = await fetch(`${BASE_URL}${this.resource}`);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }

        const data = await res.json();
        return data as GameCharacter[];
    }

    public async get(id: number): Promise<GameCharacter | null> {
        const res = await fetch(`${BASE_URL}${this.resource}/${id}`);

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }

        const data = await res.json();
        return data as GameCharacter;
    }

    public async post(obj: GameCharacter): Promise<void> {
        const options = {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type' : 'application/json',
            }),
        };

        if (this.auth.isLoggedIn) {
            options.headers.append('Authorization', 'Bearer ' + this.auth.encodedToken);
        }

        const res = await fetch(`${BASE_URL}${this.resource}`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }

    public async put(id: number, obj: GameCharacter): Promise<void> {
        const options = {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({
                'Content-Type' : 'application/json',
            }),
        };

        if (this.auth.isLoggedIn) {
            options.headers.append('Authorization', 'Bearer ' + this.auth.encodedToken);
        }

        const res = await fetch(`${BASE_URL}${this.resource}/${id}`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }

    public async delete(id: number): Promise<void> {
        const options = {
            method: 'DELETE',
            headers: new Headers(),
        };

        if (this.auth.isLoggedIn) {
            options.headers.append('Authorization', 'Bearer ' + this.auth.encodedToken);
        }

        const res = await fetch(`${BASE_URL}${this.resource}/${id}`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }
}
