// react:
import { default as React, useState, } from 'react'; // base technology of our nodestrap components
// cssfn:
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, 
// rules:
states, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { 
// utilities:
setRef, } from '@nodestrap/utilities';
import { usePropValidation, ValidationProvider, } from '@nodestrap/validations';
// nodestrap components:
import { 
// hooks:
usesSizeVariant, } from '@nodestrap/basic';
import { 
// styles:
usesContentLayout, usesContentVariants, Content, } from '@nodestrap/content';
import { 
// hooks:
isValid, isInvalid, usesValidInvalidState, markValid, markInvalid, useValidInvalidState, } from '@nodestrap/editable-control';
export const useFormValidator = (customValidator) => {
    // states:
    let [isValid, setIsValid] = useState(null);
    const handleValidation = (target, immediately = false) => {
        const getIsValid = () => target.matches(':valid') ? true : (target.matches(':invalid') ? false : null);
        const update = (validPrev) => {
            const validNow = getIsValid();
            if ((validPrev !== undefined) && (validPrev !== validNow))
                return; // the validity has been modified during waiting => abort further validating
            // instantly update variable `isValid` without waiting state to refresh (re-render)
            // because the value is needed immediately by `useValidInvalidState` at startup
            isValid = (customValidator ? customValidator(validNow) : validNow);
            setIsValid(isValid);
        };
        if (immediately) {
            // instant validate:
            update();
        }
        else {
            const validPrev = getIsValid();
            // delay a while for the further validating, to avoid unpleasant splash effect
            setTimeout(() => update(validPrev), (validPrev !== false) ? 300 : 600);
        } // if
    };
    const handleInit = (target) => {
        handleValidation(target, /*immediately =*/ true);
    };
    const handleChange = (target) => {
        handleValidation(target);
    };
    return {
        /**
         * Handles the validation result.
         * @returns
         * `null`  = uncheck.
         * `true`  = valid.
         * `false` = invalid.
         */
        validator: (() => isValid),
        handleInit: handleInit,
        handleChange: handleChange,
    };
};
//#endregion validInvalid
// styles:
export const usesFormLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesFormVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesFormStates = () => {
    // dependencies:
    // states:
    const [validInvalid] = usesValidInvalidState();
    return composition([
        imports([
            // states:
            validInvalid(),
        ]),
        states([
            isValid([
                imports([
                    markValid(),
                ]),
            ]),
            isInvalid([
                imports([
                    markInvalid(),
                ]),
            ]),
        ]),
    ]);
};
export const useFormSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesFormLayout(),
            // variants:
            usesFormVariants(),
            // states:
            usesFormStates(),
        ]),
    ]),
], /*sheetId :*/ 'eqakn9c0py'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
    /* no config props yet */
    };
}, { prefix: 'frm' });
export function Form(props) {
    // styles:
    const sheet = useFormSheet();
    // states:
    const formValidator = useFormValidator(props.customValidator);
    const validInvalidState = useValidInvalidState(props, formValidator.validator);
    // fn props:
    const propValidation = usePropValidation(props);
    // jsx:
    return (React.createElement(Content, { ...props, 
        // semantics:
        semanticTag: props.semanticTag ?? 'form', semanticRole: props.semanticRole ?? 'form', 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, stateClasses: [...(props.stateClasses ?? []),
            validInvalidState.class,
        ], 
        // validations:
        elmRef: (elm) => {
            setRef(props.elmRef, elm);
            if (elm) {
                formValidator.handleInit(elm);
            } // if
        }, onChange: (e) => {
            props.onChange?.(e);
            // validations:
            formValidator.handleChange(e.currentTarget);
        }, 
        // events:
        onAnimationEnd: (e) => {
            props.onAnimationEnd?.(e);
            // validations:
            validInvalidState.handleAnimationEnd(e);
        } }, props.children && React.createElement(ValidationProvider, { ...propValidation }, props.children)));
}
export { Form as default };
