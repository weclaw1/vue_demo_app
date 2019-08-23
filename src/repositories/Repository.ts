export const BASE_URL = 'http://localhost:9000';

export interface Repository<T> {
    getAll(): Promise<T[]>;
    get(id: number): Promise<T | null>;
    post(obj: T): Promise<void>;
    put(id: number, obj: T): Promise<void>;
    delete(id: number): Promise<void>;
}
