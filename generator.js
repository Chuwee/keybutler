// generator.js

function sum_ascii(domain) {
    var sum = 0;
    for (let i = 0; i < domain.length; i++) 
    {
        sum += domain[i];
    }
    return sum;
}

function generate(domain) {
    let p = "";
    sum=sum_ascii(domain) % 3;
    return domain;
}