const fs = require('fs');
const { builtinModules } = require('module');

const filePath = './data';
const dataPath = `${filePath}/contacts.json`;
if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
};

// membuat file contacts.json
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// Membaca json
const loadContact = () =>{
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const x = JSON.parse(file);
    return x;
}

// cari contact
const findContact = (nama) =>{
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

module.exports = {loadContact, findContact};
