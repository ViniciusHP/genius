export function debounce(milliseconds = 500) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value; // Obtendo função original
    let timer = 0;

    descriptor.value = function(...args: any[]) {
      if(event) event.preventDefault();
      clearTimeout(timer);
      timer = window.setTimeout(()=> {
        originalMethod.apply(this, args);
      } , milliseconds);
    }

    return descriptor;
  }
}