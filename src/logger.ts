
import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        // add your tailored logic here
        super.error(message, stack, context);
    }
    log(message: any, context?: string) {
        // add your tailored logic here
        super.log(message, context);
    }
    warn(message: any, context?: string) {
        // add your tailored logic here
        super.warn(message, context);
    }

}
