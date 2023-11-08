import { IOperation } from 'src/global/interfaces/Operations';
import { EResponseCodes } from '../global/constants/codes-response.enum';

export class ApiResponse<T> {
    data: T;
    operation: IOperation;

    constructor(data: T, code: EResponseCodes, message?: string) {
        this.data = data;
        this.operation = { code, message };
    }
}
