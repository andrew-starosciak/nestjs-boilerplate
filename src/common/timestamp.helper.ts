export namespace TIME {
    export function timestamps() {
        return {
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }
}
