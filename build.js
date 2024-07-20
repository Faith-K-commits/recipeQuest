const fs = require('fs');

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const result = data.replace(/\${process.env.SPOONACULAR_API_KEY}/g, process.env.SPOONACULAR_API_KEY);

    fs.writeFile('public/index.html', result, 'utf8', (err) => {
        if (err) return console.log(err);
    });
});
