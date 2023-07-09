import { GenderType, RelationType } from "../Enums/Enums";

const notSelectedOption = "Select None";

export const cities = [
    "Select None",
    "Lahore, Pubjab",
    "Quetta, Balochistan",
    "Peshawer, Khyber",
    "Sahiwal, Punjab",
    "Shakargarh, Punjab",
    "Islamabad, Capital"
];

export const genders = [].concat([notSelectedOption,...Object.keys(GenderType)]);

export const relations = [].concat([notSelectedOption, ...Object.keys(RelationType)]);;
