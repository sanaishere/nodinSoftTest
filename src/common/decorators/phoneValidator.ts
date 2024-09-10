import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
export function phoneNumberValidator(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'phoneNumberValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
       const phoneNumber=args.object['phoneNumber']
       if(phoneNumber.startsWith('098')){
        return true;
       }
    },
    defaultMessage(){
      return 'it should starts with 098'
    }
}
    })
}
}
