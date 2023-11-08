import { EResponseCodes } from '../constants/codes-response.enum';

export interface IOperation {
    code: EResponseCodes;
    message?: string;
}