export function debounce(milliseconds = 500) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let timer = 0;
        descriptor.value = function (...args) {
            if (event)
                event.preventDefault();
            clearTimeout(timer);
            timer = window.setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
