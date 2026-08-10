function process(value: unknown) {
    if( typeof value === "object" && !!value && 'log' in value && typeof value.log === 'function') {

        value.log(); // Error: Object is of type 'unknown'.
    }
}   