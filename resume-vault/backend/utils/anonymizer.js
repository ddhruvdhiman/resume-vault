function anonymizeResume(text) {
    const patterns = [
        /\bMr\.?|Ms\.?|Mrs\.?\b/gi,
        /\b(he|she|him|her|his|hers)\b/gi,
        /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, // names (very naive)
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi // email
    ];

    return patterns.reduce((acc, regex) => acc.replace(regex, '[REDACTED]'), text);
}

module.exports = { anonymizeResume };
