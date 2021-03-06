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

// menuliskan atau menimpa file contacts.json dengan data yang baru
const saveContacts = contacts => {
    // baca file yang ada di datapath kalo nggak ada buat file baru kalo ada timpa datanya
    fs.writeFileSync(dataPath, JSON.stringify(contacts));

}

// menambahkan data contact baru
const addContact = contact => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// cek nama duplikat
const cekDuplikat = nama => {
    const contacts = loadContact();
    return contacts.find(contact => contact.nama === nama);
}

// hapus contact
const deleteContact = nama =>{
    const contacts = loadContact();
    const filteredContacts = contacts.filter(contact=> contact.nama !== nama);
    saveContacts(filteredContacts);
}

// Mengubah contacts
const updateContacts = (contactBaru) =>{
    const contacts = loadContact();
    // Hilangkan contact lama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter(contact => contact.nama !== contactBaru.oldNama);
    // hapus oldNama
    delete contactBaru.oldNama;
    // masukkan contactbaru
    filteredContacts.push(contactBaru);
    // save
    saveContacts(filteredContacts);
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts};
