import { v4 as uuidv4 } from "uuid";

export const IdGenerator = {

    generateBusinessId: (): string => `business-${uuidv4()}`,
    
    generateOfficeId: (): string => `office-${uuidv4()}`,

    generateDeskId: (): string => `desk-${uuidv4()}`,
};
