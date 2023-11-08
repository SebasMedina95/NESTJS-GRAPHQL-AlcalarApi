import { Logger } from "@nestjs/common";
  
  export class MyErrorsExceptions {
  
    private readonly logger = new Logger('MyErrorsExceptions');
  
    public async handleDbExceptions(error: any): Promise<Error> {
  
      this.logger.error(error);
      if (error.code === '23505') 
        return new Error(`ATENCIÓN, se están repitiendo valores en campos que son de tipo único, revise. Detalles del error: ${error.detail}`);

      return new Error(`Ocurrio un error fatal, revisar el log del servidor. Anotaciones adicionales: ${error}`);
  
    }
  
  }