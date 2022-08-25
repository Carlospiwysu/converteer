//
const express = require('express');


//constante que va a inicializar nuestro servidor express
const app = express();


const port = 3000;
// cuando get solo tiene el / indicamos la raiz de la ruta
app.get('/', (req, res) => {//req para requerir info res para responder al cliente
    res.send("Hola mundo");
});


/*app.get('/converter', (req, res)=>{
    let {convertfrom, convertTo, value} = req.query;
//convertfrom: nos va a indicar de que tipo es el valor
//convertTo: a que tipo lo debemos covertir
    console.log(convertTo);
    console.log(convertfrom);
    console.log(value );
//http://localhost:3000/converter?convertfrom=binary&convertTo=decimal&value=1010
    res.send("Converter");//crea como una nueva ruta en el servidor

});
*/


//validar datos de entrada
app.get('/converter', (req, res) => {
    let { convertfrom, convertTo, value } = req.query;
    //de esta manera se separan las condicionales
    if (convertfrom === undefined
        || convertfrom === ''
        || convertTo === undefined
        || convertTo === ''
        || value === undefined
        || value === ''
    ) {
        return res.status(400).json({ status: false, value: 'los datos no pueden ser leidos' });
    }
    switch (convertfrom) {
        case 'binary': {
            value = '0b' + value;
            break;
        }
        case 'decimal': {
            value = value;
            break;
        }

        case 'octal': {
            value = '0o' + value;
            break;
        }
        case 'hexadecimal': {
            value = '0x' + value;
            break;
        }

        default: {
            res.status(400).json({
                status: false, 
                value: 'Convertfrom no es value porfavor realice la consulta nuevamente'
            });

        }
    }
    
    console.log(value);
    //isNaN nos permite verificar si un string se puede convertir en un numero o no
    if(isNaN(value)){
        res.status(400).json({
            status: false, 
            value: 'value no es value porfavor verifique'
        });        
    }

    switch (convertTo) {
        case 'binary': {
            res.status(200).json({
                status: true, 
                value: Number(value).toString(2)
            });   
            break;
        }
        case 'decimal': {
            res.status(200).json({
                status: true, 
                value: Number(value).toString(10)
            });  
            break;
        }

        case 'octal': {
            res.status(200).json({
                status: true, 
                value: Number(value).toString(8)
            });  
            break;
        }
        case 'hexadecimal': {
            res.status(200).json({
                status: true, 
                value: Number(value).toString(16)
            });  
            break;
        }

        default: {
            res.status(400).json({
                status: false, 
                value: 'convertTo no es value porfavor realice la consulta nuevamente'
            });

        }
    } 

    //res.send("Converter");

    });

//lalalala

app.listen(port, () => {
    console.log(`Servidor esta corriendo en Servidor esta corriendo en http://localhost:${port}`);// http://localhost:3000 esta es nuestra ruta ip y 3000 seria el puerto 
});
