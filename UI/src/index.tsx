import { ModRegistrar } from "cs2/modding";
import { load } from "assetErrorHandler";

const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.append('Menu', load);
}

export default register;