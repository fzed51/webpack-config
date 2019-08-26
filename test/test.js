const conf = require('../src/config')

console.log('DEFAULT -------------------');
console.log(conf());

console.log('cleanOutput: false -------------------');
console.log(conf({
    cleanOutput: false
}));

console.log('cleanOutput: with exclude -------------------');
console.log(conf({
    cleanOutput: {
        exclude: [
            'static.*',
            'to/static/*.*'
        ]
    }
}));


console.log('useReact: false -------------------');
console.log(conf({
    useReact: false
}));


console.log('useTypescript: false -------------------');
console.log(conf({
    useTypescript: false
}));


console.log('htmlWebpackPlugin: false -------------------');
console.log(conf({
    htmlWebpackPlugin: false
}));