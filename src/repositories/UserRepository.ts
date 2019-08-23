import { Repository, BASE_URL } from './Repository';
import { User } from '../entities/User';

import { getModule } from 'vuex-module-decorators';
import Auth from '../store/Auth';

const RESOURCE = '/users';

export class UserRepository implements Repository<User> {
    private auth: Auth = getModule(Auth);

    public async getAll(): Promise<User[]> {
        const res = await fetch(`${BASE_URL}${RESOURCE}`);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }

        const data = await res.json();
        return data as User[];
    }

    public async get(id: number): Promise<User | null> {
        const res = await fetch(`${BASE_URL}${RESOURCE}/${id}`);

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }

        const data = await res.json();
        return data as User;
    }

    public async sign_up(obj: User): Promise<void> {
        const options = {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type' : 'application/json',
            },
        };

        const res = await fetch(`${BASE_URL}${RESOURCE}/sign-up`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }

    public async post(obj: User): Promise<void> {
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

        const res = await fetch(`${BASE_URL}${RESOURCE}`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }

    public async put(id: number, obj: User): Promise<void> {
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

        const res = await fetch(`${BASE_URL}${RESOURCE}/${id}`, options);

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

        const res = await fetch(`${BASE_URL}${RESOURCE}/${id}`, options);

        if (!res.ok) {
            throw new Error(res.status.toString() + res.statusText);
        }
    }
}
