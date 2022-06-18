const axios = require('axios');
const qs = require('querystring');

async function papago(query, sourceLang, targetLang) {
    const url = 'papago/n2mt';

    const params = qs.stringify({
        source: sourceLang,
        target: targetLang,
        text: query,
    });

    const config = {
        baseURL: 'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-naver-client-id': 'pH1cA6qBWOfU2mx_OjVh',
            'x-naver-client-secret': '8N9ARtr0MZ',
        },
    };

    const response = await axios.post(url, params, config);
    return response.data.message.result.translatedText;
}
// korean -> english
const translateKor = (query) => {
    return papago(query, 'ko', 'en');
}
// english -> korean
const translateEn = (query) => {
    return papago(query, 'en', 'ko');
}

async function translate(query) {
    const kotoen = await translateKor(query);
    const entoko = await translateEn(kotoen);
    return entoko;
}

module.exports = translate;
