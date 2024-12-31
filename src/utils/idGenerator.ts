import { v4 as uuidv4 } from "uuid";

export const IdGenerator = {

    generateBusinessId: (): string => `BUS-${uuidv4()}`,
    

    generateOfficeId: (): string => `OFF-${uuidv4()}`,
};
