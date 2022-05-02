let validate = (value) => {
    let errors = {}
    if(value.name){
        if(!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(value.name)){
            errors.name = 'Name cannot contain numbers or special characters.';
            console.log(errors)
        }
        else errors.name = '';
    }
    else errors.name = 'Name is required.';

    if(parseInt(value.minWeight) && parseInt(value.maxWeight)){
        if(parseInt(value.minWeight) <= 0 || parseInt(value.maxWeight) <= 0){
            errors.weight= 'Weight cannot be negative or zero.'
        }
        else if(parseInt(value.minWeight) > parseInt(value.maxWeight)){
            errors.weight= 'Minimum weight cannot be greater than maximum weight.'
        }
        // else if(parseInt(value.minWeight) > 150 || parseInt(value.maxWeight) > 150){
        //     errors.height= 'weight cannot be greater than 150'
        // }
        else errors.weight = '';
    }
    else errors.weight = 'Weight is required.';

    if(parseInt(value.minHeight) && parseInt(value.maxHeight)){
        if(parseInt(value.minHeight) <= 0 || parseInt(value.maxHeight) <= 0){
            errors.height= 'Height cannot be negative or zero.'
        }
        else if(parseInt(value.minHeight) > parseInt(value.maxHeight)){
            errors.height= 'Minimum height cannot be greater than maximum height.'
        }
        // else if(parseInt(value.minHeight) > 150 || parseInt(value.maxHeight) > 150){
        //     errors.height= 'height cannot be greater than 150'
        // }
        else errors.height = '';
    }
    else errors.height = 'Height is required.';

    if(parseInt(value.minAge) && parseInt(value.maxAge)){
        if(parseInt(value.minAge) <= 0 || parseInt(value.maxAge) <= 0){
            errors.age= 'Age cannot be negative or zero.'
        }
        else if(parseInt(value.minAge) > parseInt(value.maxAge)){
            errors.age= 'Minimum age cannot be greater than maximum age.'
        }
        // else if(parseInt(value.minHeight) > 150 || parseInt(value.maxHeight) > 150){
        //     errors.height= 'height cannot be greater than 150'
        // }
        else errors.age = '';
    }
    else errors.age = 'Age is required.';

    if(/^(ftp|http|https):\/\/[^ "]+$/.test(value.img)){
        errors.img = '';
    }else errors.img = 'Must have a valid link image.'

    return errors;
}

export default validate;