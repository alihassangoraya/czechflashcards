const fillerExample = /(Potřebuji si zapamatovat|Ve slovníku jsem našel|V textu jsem četl|V češtině často vidím|V nové větě používám|Dnes si zapíšu|Dnes trénuji použití|Dnes procvičuji|Dnes opakuji|The teacher explained the expression|I found the expression|I read the word|I need to remember the word|I use the word|Today I am practicing the use|Today I am reviewing)/i;
const mojibake = /[ÃÄÅÂ]|�/;
const hasDevanagari = /[\u0900-\u097F]/;
const hasArabic = /[\u0600-\u06FF]/;
const hasLatin = /[A-Za-z]/;
const generatedExample = /(^Dnes potřebuju|pracuje dnes dlouho|^Nebudu .* pozdě večer\.$|^Umím .* jen trochu\.$|^Udělám to (furt|mile|polo|blaze|nato|minus|tama)\.$|^Ten (plán|byt) je |^Ten (onen|aji) je |I need .* today|works for a long time today|The flat is (thick|naked|French|quick|thin|ripe|obedient))/i;
const rejectedPlaceholderExample = /se používá v každodenní praxi|used in everyday practice|used in healthcare|používá ve zdravotnictví|appears in the text|objevuje slovo|part of a meal|součást jídla|can affect the final result|ovlivnit konečný výsledek|contains useful information|obsahuje užitečné informace|is located near the city|nachází nedaleko města|works in their field|pracuje ve svém oboru|requires regular practice|vyžaduje pravidelný trénink|transports people or cargo|přepravuje lidi nebo náklad|appears in stories and films|objevuje se v příbězích a filmech|requires a medical examination|potřebuje lékařské vyšetření|is used to make various products|používá při výrobě různých produktů|is served in a glass|podává ve sklenici|žije ve volné přírodě|lives in the wild|patří do kulturního programu|is part of the cultural program|se v přírodě objevuje za určitých podmínek|occurs in nature under certain conditions|vyžaduje opatrné zacházení|requires careful handling|používá při odborném měření|used in technical measurement|sdružuje více lidí|brings several people together|je na stole|is on the table|začíná podle programu|begins according to the schedule|roste v přírodě|grows in nature|je pro mě důležitý den|is an important day for me|je pro mě důležitý měsíc|is an important month for me|patří do kalendáře|is part of the calendar|leží na stole|is lying on the table|je písmeno řecké abecedy|is a letter of the greek alphabet/i;

module.exports = {
  fillerExample,
  generatedExample,
  hasArabic,
  hasDevanagari,
  hasLatin,
  mojibake,
  rejectedPlaceholderExample
};
