import { default as React } from 'react';
import { Result as ValResult, ValidationProps } from '@nodestrap/validations';
import { ContentProps } from '@nodestrap/content';
import { ValidatorHandler } from '@nodestrap/editable-control';
export declare type CustomValidatorHandler = (isValid: ValResult) => ValResult;
export declare const useFormValidator: (customValidator?: CustomValidatorHandler | undefined) => {
    /**
     * Handles the validation result.
     * @returns
     * `null`  = uncheck.
     * `true`  = valid.
     * `false` = invalid.
     */
    validator: ValidatorHandler;
    handleInit: (target: HTMLFormElement) => void;
    handleChange: (target: HTMLFormElement) => void;
};
export declare const usesFormLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesFormVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesFormStates: () => import("@cssfn/cssfn").Rule;
export declare const useFormSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{}>, cssDecls: import("@cssfn/css-config").Decls<{}>, cssVals: import("@cssfn/css-config").Vals<{}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface FormProps extends ContentProps<HTMLFormElement>, React.FormHTMLAttributes<HTMLFormElement>, ValidationProps {
    customValidator?: CustomValidatorHandler;
    children?: React.ReactNode;
}
export declare function Form(props: FormProps): JSX.Element;
export { Form as default };
