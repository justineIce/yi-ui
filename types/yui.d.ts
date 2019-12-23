import Vue from 'vue'
import {YiForm} from "./form";

export interface InstallationOptions {
    locale: any,
    i18n: any,
    size: string
}
export function install (vue: typeof Vue, options: InstallationOptions): void

export class Form extends YiForm{}
