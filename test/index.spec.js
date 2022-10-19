import app from '../src/app.js';
import request from 'supertest'

describe('ruta tasks', () => {

    test('deberia responder con 200 status code', async () => {
        const response = await request(app).get('/tasks').send()//reviso que me llega cuando busco la ruta /tasks en app
        /* console.log(response); */
        expect(response.statusCode).toBe(404);//busca si el codigo es 200
    });

    test('deberia responder con un 200 status code', async () => {
        const response = await request(app).get('/ping').send();//veirifica que exista la ruta
        expect(response.statusCode).toBe(200);
    })

    test('should respond with an array', async () => {
        const response = await request(app).get('/task').send();
        expect(response.body).toBeInstanceOf(Array); //verifico que en /task me devuelva un array
    });

});

describe('POST /tasks', () => {

    describe('given title and description', () => {

        const newTask = {
            title: "test task",
            description: "test description"                    //envio un objeto de prueba
        }

        test('should respond width a 200 status code', async () => {
            const respose = await request(app).post('/tasks').send(newTask); //verifica que exista la ruta
            expect(respose.statusCode).toBe(200);
        });

        test('should have a content-type: application/json in header', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            /* expect(response.header['content-type']).toBe('application/json'); *///esto especifica que sea igual
            expect(response.header['content-type']).toEqual(expect.stringContaining("json")) //especifica que contenga la palabra json
        });

        test('should respond width an task ID', async () => {
            const response = await request(app).post('/tasks').send(newTask); // le envio el objeto de prueba
            expect(response.body.id).toBeDefined();
        });

    });


    describe('when title and description is missing', () => {
        const fields = [
            {},
            {title : 'nuevo'},
            {description : "descripcion"}
        ];


        for (const body of fields) {//recorremos el array para que pruebe las distintas posibilidades
            test('should respond width a 400 status code', async () => {
                const response = await request(app).post('/tasks').send(body); //verifica que mande un titulo vacio o description vacio
                expect(response.statusCode).toBe(400);
            });
        }
        
        
    });
    




});
