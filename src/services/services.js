export const formatarCPF = (value) => {
    
    const cleaned = ('' + value).replace(/\D/g, '');
    
    
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
        return !match[2] ? match[1] : match[1] + '.' + match[2] + (match[3] ? '.' + match[3] : '') + (match[4] ? '-' + match[4] : '');
    }
    
    return value;
};

export const formatarCEP = (value) => {
    
    const cleaned = ('' + value).replace(/\D/g, '');
    
    
    const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
    if (match) {
        return !match[2] ? match[1] : match[1] + '-' + match[2];
    }
    
    return value;
};

export const verificarCamposVazios = (campos) => {
    const camposVazios = {};

    Object.keys(campos).forEach((key) => {
        if (campos[key].required && campos[key].value.trim() === '') {
            camposVazios[key] = true;
        } else {
            camposVazios[key] = false;
        }
    });

    return camposVazios;
};