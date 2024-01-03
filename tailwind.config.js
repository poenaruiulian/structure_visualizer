/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/*.{js,jsx,ts,tsx}",
    ],
    theme: {
       colors:{
           'background':"#DCF2F1",
           'tertiary':"#7FC7D9",
           'secondary':"#365486",
           'primary':"#0F1035",
           'add':"#9ADE7B",
           'remove':"#FA7070"
       }
    },
    plugins: [],
}