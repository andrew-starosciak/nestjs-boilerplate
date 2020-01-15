
export class BaseError {
    public code?: number;
    public devMessage?: string;
    public message: string;
    public meta?: any;
    public timestamp: Date = new Date();

    constructor(
        message: string, devMessage?: string, meta?: any,
    ) {
        this.from({message, devMessage, meta});
    }

    from(partial: Partial<BaseError>): this {
        this.code = partial.code;
        this.devMessage = partial.devMessage || null;
        this.message = partial.message || null;
        this.meta = partial.meta || null;
        return this;
    }
}
