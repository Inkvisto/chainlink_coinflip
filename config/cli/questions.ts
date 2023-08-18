import Select from "./select.js";
import pnpmSpawn from './pnpm-manager/spawn.js'
Select({
    name: 'UI tool',
    message: 'Choose ui tool',
    choices: [
        { title: 'MaterialUi', description: 'Buttons and tabs', value: '@mui/material @emotion/react @emotion/styled' },
        { title: 'AntDesign', value: '#00ff00' },
        { title: 'Yellow', value: '#ffff00', disabled: true },
        { title: 'Blue', value: '#0000ff' }
    ]
},
    {
        onSubmit: async(args:string) => {
           // await pnpmSpawn(['add', 'colors'])
        }
    });
