import { throwError } from 'rxjs';

export abstract class BaseService {
    constructor() { }

    protected handleError(err: any) { 
        var applicationError = err.headers.get('Application-Error');

        if (applicationError) {
            return throwError(applicationError);
        }

        var modelStateError: string = '';

        for (var key in err.error) {
            if (err.error[key]) modelStateError += err.error[key].description + '\n';
        }

        modelStateError = modelStateError = '' ? null : modelStateError;
        return throwError(modelStateError || 'Server error');
    }
}