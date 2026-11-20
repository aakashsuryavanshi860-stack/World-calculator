// ==========================================
// GOOGLE TRANSLATE LANGUAGES DATABASE (100+)
// ==========================================
var googleLanguages = [
    { code: "af", name: "Afrikaans", country: "South Africa" },
    { code: "sq", name: "Shqip (Albanian)", country: "Albania" },
    { code: "am", name: "አማርኛ (Amharic)", country: "Ethiopia" },
    { code: "ar", name: "العربية (Arabic)", country: "Saudi Arabia" },
    { code: "hy", name: "Հայերեն (Armenian)", country: "Armenia" },
    { code: "az", name: "Azərbaycan (Azerbaijani)", country: "Azerbaijan" },
    { code: "eu", name: "Euskara (Basque)", country: "Spain" },
    { code: "be", name: "Беларуская (Belarusian)", country: "Belarus" },
    { code: "bn", name: "বাংলা (Bengali)", country: "Bangladesh" },
    { code: "bs", name: "Bosanski (Bosnian)", country: "Bosnia" },
    { code: "bg", name: "Български (Bulgarian)", country: "Bulgaria" },
    { code: "ca", name: "Català (Catalan)", country: "Spain" },
    { code: "ceb", name: "Cebuano", country: "Philippines" },
    { code: "ny", name: "Chichewa", country: "Malawi" },
    { code: "zh-CN", name: "简体中文 (Chinese - Simplified)", country: "China" },
    { code: "zh-TW", name: "繁體中文 (Chinese - Traditional)", country: "Taiwan" },
    { code: "co", name: "Corsu (Corsican)", country: "France" },
    { code: "hr", name: "Hrvatski (Croatian)", country: "Croatia" },
    { code: "cs", name: "Čeština (Czech)", country: "Czech Republic" },
    { code: "da", name: "Dansk (Danish)", country: "Denmark" },
    { code: "nl", name: "Nederlands (Dutch)", country: "Netherlands" },
    { code: "en", name: "English", country: "United States" },
    { code: "eo", name: "Esperanto", country: "International" },
    { code: "et", name: "Eesti (Estonian)", country: "Estonia" },
    { code: "tl", name: "Filipino", country: "Philippines" },
    { code: "fi", name: "Suomi (Finnish)", country: "Finland" },
    { code: "fr", name: "Français (French)", country: "France" },
    { code: "fy", name: "Frysk (Frisian)", country: "Netherlands" },
    { code: "gl", name: "Galego (Galician)", country: "Spain" },
    { code: "ka", name: "ქართული (Georgian)", country: "Georgia" },
    { code: "de", name: "Deutsch (German)", country: "Germany" },
    { code: "el", name: "Ελληνικά (Greek)", country: "Greece" },
    { code: "gu", name: "ગુજરાતી (Gujarati)", country: "India" },
    { code: "ht", name: "Kreyòl ayisyen (Haitian Creole)", country: "Haiti" },
    { code: "ha", name: "Hausa", country: "Nigeria" },
    { code: "haw", name: "Hawaiian", country: "United States" },
    { code: "he", name: "עברית (Hebrew)", country: "Israel" },
    { code: "hi", name: "हिन्दी (Hindi)", country: "India" },
    { code: "hmn", name: "Hmong", country: "Laos" },
    { code: "hu", name: "Magyar (Hungarian)", country: "Hungary" },
    { code: "is", name: "Íslenska (Icelandic)", country: "Iceland" },
    { code: "ig", name: "Igbo", country: "Nigeria" },
    { code: "id", name: "Bahasa Indonesia", country: "Indonesia" },
    { code: "ga", name: "Gaeilge (Irish)", country: "Ireland" },
    { code: "it", name: "Italiano (Italian)", country: "Italy" },
    { code: "ja", name: "日本語 (Japanese)", country: "Japan" },
    { code: "jw", name: "Jawa (Javanese)", country: "Indonesia" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)", country: "India" },
    { code: "kk", name: "Қазақ (Kazakh)", country: "Kazakhstan" },
    { code: "km", name: "ខ្មែរ (Khmer)", country: "Cambodia" },
    { code: "rw", name: "Kinyarwanda", country: "Rwanda" },
    { code: "ko", name: "한국어 (Korean)", country: "South Korea" },
    { code: "ku", name: "Kurdî (Kurdish)", country: "Iraq" },
    { code: "ky", name: "Кыргызча (Kyrgyz)", country: "Kyrgyzstan" },
    { code: "lo", name: "ລາວ (Lao)", country: "Laos" },
    { code: "la", name: "Latina (Latin)", country: "Vatican City" },
    { code: "lv", name: "Latviešu (Latvian)", country: "Latvia" },
    { code: "lt", name: "Lietuvių (Lithuanian)", country: "Lithuania" },
    { code: "lb", name: "Lëtzebuergesch (Luxembourgish)", country: "Luxembourg" },
    { code: "mk", name: "Македонски (Macedonian)", country: "North Macedonia" },
    { code: "mg", name: "Malagasy", country: "Madagascar" },
    { code: "ms", name: "Bahasa Melayu (Malay)", country: "Malaysia" },
    { code: "ml", name: "മലയാളം (Malayalam)", country: "India" },
    { code: "mt", name: "Malti (Maltese)", country: "Malta" },
    { code: "mi", name: "Māori", country: "New Zealand" },
    { code: "mr", name: "मराठी (Marathi)", country: "India" },
    { code: "mn", name: "Монгол (Mongolian)", country: "Mongolia" },
    { code: "my", name: "မြန်မာ (Burmese)", country: "Myanmar" },
    { code: "ne", name: "नेपाली (Nepali)", country: "Nepal" },
    { code: "no", name: "Norsk (Norwegian)", country: "Norway" },
    { code: "or", name: "ଓଡ଼ିଆ (Odia)", country: "India" },
    { code: "ps", name: "پښتو (Pashto)", country: "Afghanistan" },
    { code: "fa", name: "فارسی (Persian)", country: "Iran" },
    { code: "pl", name: "Polski (Polish)", country: "Poland" },
    { code: "pt", name: "Português (Portuguese)", country: "Portugal" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", country: "India" },
    { code: "ro", name: "Română (Romanian)", country: "Romania" },
    { code: "ru", name: "Русский (Russian)", country: "Russia" },
    { code: "sm", name: "Samoa", country: "Samoa" },
    { code: "gd", name: "Gàidhlig (Scots Gaelic)", country: "Scotland" },
    { code: "sr", name: "Српски (Serbian)", country: "Serbia" },
    { code: "st", name: "Sesotho", country: "Lesotho" },
    { code: "sn", name: "Shona", country: "Zimbabwe" },
    { code: "sd", name: "سنڌي (Sindhi)", country: "Pakistan" },
    { code: "si", name: "සිංහල (Sinhala)", country: "Sri Lanka" },
    { code: "sk", name: "Slovenčina (Slovak)", country: "Slovakia" },
    { code: "sl", name: "Slovenščina (Slovenian)", country: "Slovenia" },
    { code: "so", name: "Somali", country: "Somalia" },
    { code: "es", name: "Español (Spanish)", country: "Spain" },
    { code: "su", name: "Basa Sunda (Sundanese)", country: "Indonesia" },
    { code: "sw", name: "Kiswahili (Swahili)", country: "Kenya" },
    { code: "sv", name: "Svenska (Swedish)", country: "Sweden" },
    { code: "tg", name: "Тоҷикӣ (Tajik)", country: "Tajikistan" },
    { code: "ta", name: "தமிழ் (Tamil)", country: "Sri Lanka" },
    { code: "tt", name: "Татарча (Tatar)", country: "Russia" },
    { code: "te", name: "తెలుగు (Telugu)", country: "India" },
    { code: "th", name: "ไทย (Thai)", country: "Thailand" },
    { code: "tr", name: "Türkçe (Turkish)", country: "Turkey" },
    { code: "tk", name: "Türkmen (Turkmen)", country: "Turkmenistan" },
    { code: "uk", name: "Українська (Ukrainian)", country: "Ukraine" },
    { code: "ur", name: "اردو (Urdu)", country: "Pakistan" },
    { code: "ug", name: "ئۇيغۇرچە (Uyghur)", country: "China" },
    { code: "uz", name: "Oʻzbek (Uzbek)", country: "Uzbekistan" },
    { code: "vi", name: "Tiếng Việt (Vietnamese)", country: "Vietnam" },
    { code: "cy", name: "Cymraeg (Welsh)", country: "Wales" },
    { code: "xh", name: "isiXhosa", country: "South Africa" },
    { code: "yi", name: "ייִדיש (Yiddish)", country: "Israel" },
    { code: "yo", name: "Yorùbá", country: "Nigeria" },
    { code: "zu", name: "isiZulu", country: "South Africa" }
];

// ==========================================
// AUTO-POPULATE DROPDOWN FUNCTION
// ==========================================
function loadLanguagesIntoDropdown(selectElementId) {
    var select = document.getElementById(selectElementId);
    if (!select) return;

    // Clear existing options
    select.innerHTML = '';

    // Sort alphabetically by name
    googleLanguages.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    // Add options
    googleLanguages.forEach(function(lang) {
        var option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name + " - " + lang.country;
        select.appendChild(option);
    });
}
