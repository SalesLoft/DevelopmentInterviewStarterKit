export const merge = (...obj) => Object.assign({}, ...obj);

export const encodeGetParams = params => Object.entries(params).map(kv => kv.map(encodeURIComponent).join('=')).join('&');
