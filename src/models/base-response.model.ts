
import { BaseError } from './base-error.model';

export class BaseResponse<T> {
    public payload: T | T[];
    public status: number;
    public errors: BaseError | BaseError[];

    public from(partial: Partial<BaseResponse<T>>): this {
        this.payload = partial.payload || [];
        this.errors = partial.errors || [];
        this.status = partial.status;
        return this;
    }
}
