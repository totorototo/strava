const Defect = Symbol("Defect");

export const isValid = object => object[Defect] === undefined;

export const isFaulty = object => !isValid(object);

export const getDefect = object => isValid(object) ? "" : object[Defect];

export const NotFoundEntity = { [Defect]: "Not Found" };
export const InvalidEntity = { [Defect]: "Invalid" };
