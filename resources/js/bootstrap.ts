// resources/js/global.d.ts
import { AxiosStatic } from 'axios';

declare global {
    interface Window {
        axios: AxiosStatic;
    }
}