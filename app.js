const languages = [
    {"am-ET": "Amharic"},
    {"ar-SA": "Arabic"},
    {"be-BY": "Bielarus"},
    {"bem-ZM": "Bemba"},
    {"bi-VU": "Bislama"},
    {"bjs-BB": "Bajan"},
    {"bn-IN": "Bengali"},
    {"bo-CN": "Tibetan"},
    {"br-FR": "Breton"},
    {"bs-BA": "Bosnian"},
    {"ca-ES": "Catalan"},
    {"cop-EG": "Coptic"},
    {"cs-CZ": "Czech"},
    {"cy-GB": "Welsh"},
    {"da-DK": "Danish"},
    {"dz-BT": "Dzongkha"},
    {"de-DE": "German"},
     {"dv-MV": "Maldivian"},
    {"el-GR": "Greek"},
    {"en-GB": "English"},
    {"es-ES": "Spanish"},
    {"et-EE": "Estonian"},
    {"eu-ES": "Basque"},
    {"fa-IR": "Persian"},
    {"fi-FI": "Finnish"},
     {"fn-FNG": "Fanagalo"},
    {"fo-FO": "Faroese"},
    {"fr-FR": "French"},
    {"gl-ES": "Galician"},
    {"gu-IN": "Gujarati"},
    {"ha-NE": "Hausa"},
    {"he-IL": "Hebrew"},
    {"hi-IN": "Hindi"},
    {"hr-HR": "Croatian"},
     {"hu-HU": "Hungarian"},
    {"id-ID": "Indonesian"},
     {"is-IS": "Icelandic"},
    {"it-IT": "Italian"},
    {"ja-JP": "Japanese"},
    {"kk-KZ": "Kazakh"},
    {"km-KM": "Khmer"},
    {"kn-IN": "Kannada"},
    {"ko-KR": "Korean"},
    {"ku-TR": "Kurdish"},
    {"ky-KG": "Kyrgyz"},
    {"la-VA": "Latin"},
     {"lo-LA": "Lao"},
    {"lv-LV": "Latvian"},
    {"men-SL": "Mende"},
    {"mg-MG": "Malagasy"},
    {"mi-NZ": "Maori"},
    {"ms-MY": "Malay"},
    {"mt-MT": "Maltese"},
    {"my-MM": "Burmese"},
    {"ne-NP": "Nepali"},
    {"niu-NU": "Niuean"},
    {"nl-NL": "Dutch"},
     {"no-NO": "Norwegian"},
    {"ny-MW": "Nyanja"},
     {"ur-PK": "Pakistani"},
    {"pau-PW": "Palauan"},
    {"pa-IN": "Panjabi"},
    {"ps-PK": "Pashto"},
    {"pis-SB": "Pijin"},
    {"pl-PL": "Polish"},
    {"pt-PT": "Portuguese"},
    {"rn-BI": "Kirundi"},
    {"ro-RO": "Romanian"},
    {"ru-RU": "Russian"},
    {"sg-CF": "Sango"},
    {"si-LK": "Sinhala"},
    {"sk-SK": "Slovak"},
    {"sm-WS": "Samoan"},
    {"sn-ZW": "Shona"},
    {"so-SO": "Somali"},
    {"sq-AL": "Albanian"},
    {"sr-RS": "Serbian"},
    {"sv-SE": "Swedish"},
    {"sw-SZ": "Swahili"},
    {"ta-LK": "Tamil"},
    {"te-IN": "Telugu"},
    {"tet-TL": "Tetum"},
    {"tg-TJ": "Tajik"},
 {"th-TH": "Thai"},
    {"ti-TI": "Tigrinya"},
    {"tk-TM": "Turkmen"},
    {"tl-PH": "Tagalog"},
    {"tn-BW": "Tswana"},
    {"to-TO": "Tongan"},
    {"tr-TR": "Turkish"},
     {"uk-UA": "Ukrainian"},
    {"uz-UZ": "Uzbek"},
    {"vi-VN": "Vietnamese"},
    {"wo-SN": "Wolof"},
    {"xh-ZA": "Xhosa"},
    {"yi-YD": "Yiddish"},
 {"zu-ZA": "Zulu"}
 ]

const textosFirst = document.querySelector('.first');
const textoSecond = document.querySelector('.second');
const selectFirst = document.querySelector('.selectFirst');
const selectSecond = document.querySelector('.selectSecond');
const boton = document.querySelector('button');
const botonCambiar = document.querySelector('.cambiar');
const sonidoUno = document.querySelector('.sonidoUno');
const sonidoDos = document.querySelector('.sonidoDos');
const iniciar = document.querySelector('.start');
const copiarUno = document.querySelector('.copiarUno');
const copiarDos = document.querySelector('.copiarDos');
const language1 = "en-GB";
const language2 = "es-ES";

for(let i in languages){
    const key = Object.keys(languages[i]).toString();
    const value = Object.values(languages[i]).toString();
    selectFirst.innerHTML += `<option value=${key}>${value}</option>`
    selectSecond.innerHTML += `<option value=${key}>${value}</option>`
}

selectFirst.value = language2
selectSecond.value = language1

boton.addEventListener("click", async() => {

    const res = await fetch(`https://api.mymemory.translated.net/get?q=${textosFirst.value}&langpair=${selectFirst.value}|${selectSecond.value}`)
    const data = await res.json()
    // toText.value = data.responseData.translatedText
    textoSecond.value = data.responseData.translatedText
    console.log(data.responseData.translatedText)
    console.log(selectFirst.value)
    console.log(selectSecond.value)
    console.log(textoSecond.value)

    let utterance = new SpeechSynthesisUtterance(data.responseData.translatedText);
    utterance.lang = selectSecond.value
    speechSynthesis.speak(utterance);
})

// escuchar lo escrito
sonidoUno.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(textosFirst.value);
    utterance.lang = selectFirst.value
    speechSynthesis.speak(utterance);
    // console.log(textosFirst.value)
});

// escuchar lo traducido
sonidoDos.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(textoSecond.value);
    utterance.lang = selectSecond.value
    speechSynthesis.speak(utterance);
})

// cambiar el idioma a traducir
botonCambiar.addEventListener('click', () => {
    console.log(selectFirst.value)
    console.log(selectSecond.value)

    const selectFirstValues = selectFirst.value

    selectFirst.value = selectSecond.value
    selectSecond.value = selectFirstValues

    if(!textoSecond.value) return
    const textos = textosFirst.value
    textosFirst.value = textoSecond.value
    textoSecond.value = textos
});

copiarUno.addEventListener('click', () => {

    navigator.clipboard.writeText(textosFirst.value)
  .then(() => {
    // console.log('Texto copiado al portapapeles!');

    if(!textosFirst.value){
      let utterance = new SpeechSynthesisUtterance('No hay texto para copiar');
      utterance.lang = 'es-ES'
      speechSynthesis.speak(utterance);
      return
    }

    let utterance = new SpeechSynthesisUtterance('Texto copiado');
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance);

  })
  .catch((error) => {
    // console.error('Error al copiar el texto: ', error);
    let utterance = new SpeechSynthesisUtterance('Error al copiar el texto');
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance);
  });
})

copiarDos.addEventListener('click', () => {

    navigator.clipboard.writeText(textoSecond.value)
  .then(() => {
    // console.log('Texto copiado al portapapeles!');

    if(!textoSecond.value){
      let utterance = new SpeechSynthesisUtterance('no hay texto para copiar');
      utterance.lang = 'es-ES'
      speechSynthesis.speak(utterance);
      return
    }

    let utterance = new SpeechSynthesisUtterance('texto copiado');
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance);

  })
  .catch((error) => {
    // console.error('Error al copiar el texto: ', error);
    let utterance = new SpeechSynthesisUtterance('Error al copiar el texto');
    utterance.lang = 'es-ES'
    speechSynthesis.speak(utterance);
  });
})

console.log(textosFirst.value)