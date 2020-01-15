export namespace AuthenticationValidations {

    export function ValidEmail(email: string) {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (pattern.test(email)) {
            return true;
        }
        return false;
    }
}
